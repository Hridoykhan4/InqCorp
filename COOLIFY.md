# Coolify deployment

The project supports both separate Coolify resources and the included Docker Compose stack.

## Existing separate resources

Keep the backend on `https://api.inqilabtradingcorporation.com.bd` and use these frontend runtime variables:

```dotenv
VITE_BACKEND_URL=https://api.inqilabtradingcorporation.com.bd
VITE_SITE_URL=https://inqilabtradingcorporation.com.bd
```

Do not use `localhost` in a production browser-facing URL. The frontend image injects these values when the container starts, so they do not need to be baked into Git or manually added as Docker build arguments.

The nginx image has no mandatory backend hostname. This lets a standalone frontend container start even when the backend is a separate Coolify resource.

## Docker Compose

Deploy the repository with `docker-compose.yml`. Compose sets `BACKEND_UPSTREAM=http://backend:5000`, which enables the optional same-origin `/api` and `/socket.io` proxy inside the frontend container.

## Required environment variables

Paste these keys into Coolify and store passwords/secrets as encrypted values:

```dotenv
MongoDB_URL=<your MongoDB connection string>
URLS=https://inqilabtradingcorporation.com.bd,https://www.inqilabtradingcorporation.com.bd
ADMIN_EMAIL=admin@inqilab.com
ADMIN_PASSWORD=<the private admin password>
SESSION_SECRET=<at least 64 random characters>
VITE_BACKEND_URL=https://api.inqilabtradingcorporation.com.bd
VITE_SITE_URL=https://inqilabtradingcorporation.com.bd
cloud_name=<Cloudinary cloud name>
api_key=<Cloudinary API key>
api_secret=<Cloudinary API secret>
MAIL_USER=<SMTP username>
MAIL_PASS=<SMTP app password>
```

Generate `SESSION_SECRET` locally with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` and paste only the generated value into Coolify.

The backend performs an idempotent catalogue/gallery seed and admin bootstrap after every successful database connection. Existing unrelated records are preserved and seed records are updated by stable keys, not duplicated.

## Health check

Use `/api/health`. The API remains alive while MongoDB reconnects; during a database outage content endpoints return a short `503` response instead of leaking a TLS or connection-pool error.
