# Multi-stage build: build Vite app, then serve with Caddy

# ---- Build stage ----
FROM node:18-alpine AS build
WORKDIR /app

# Install deps first (better layer cache)
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM caddy:2.8.4-alpine

# Copy Caddyfile and built assets
COPY Caddyfile /etc/caddy/Caddyfile
RUN mkdir -p /app/dist
COPY --from=build /app/dist /app/dist

# Caddy will bind to $PORT via the Caddyfile (fallback to 8080)
# No CMD needed; caddy image has default, but we run explicitly for clarity
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
