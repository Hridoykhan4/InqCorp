# ===== Build Stage =====
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Compile stable placeholders into the Vite bundle. The nginx entrypoint
# replaces them with Coolify runtime values when the container starts.
ENV VITE_BACKEND_URL=__ITC_BACKEND_URL__
ENV VITE_SITE_URL=__ITC_SITE_URL__

RUN npm run build

# ===== Serve Stage =====
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/40-runtime-config.sh /docker-entrypoint.d/40-runtime-config.sh
RUN chmod +x /docker-entrypoint.d/40-runtime-config.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
