# =========================
# NPM ENV
# =========================
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules
RUN npm install
COPY . .
RUN npm run build


# =========================
# Nginx Server
# =========================
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]