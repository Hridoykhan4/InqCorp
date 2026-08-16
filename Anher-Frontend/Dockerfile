# ===== Build Stage =====
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite env vars must be passed at build time
ARG VITE_BACKEND_URL
ARG VITE_SITE_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_SITE_URL=$VITE_SITE_URL

RUN npm run build

# ===== Serve Stage =====
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
