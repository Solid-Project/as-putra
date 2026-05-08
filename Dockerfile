# =========================
# Build Project
# =========================
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


# =========================
# Nginx
# =========================
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.prod.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /usr/share/nginx/html/react
COPY --from=builder /app/dist/ /usr/share/nginx/html/react/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]