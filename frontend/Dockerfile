# ---------- STAGE 1: build ----------
FROM node:18-alpine AS builder
WORKDIR /app

# Instalar dependencias del sistema necesarias (opcional)
RUN apk add --no-cache bash git

# Copiar package.json y package-lock para aprovechar cache de Docker
COPY package*.json ./

# Instalar dependencias (usar npm ci si tiene package-lock.json)
RUN npm ci --silent

# Copiar el resto del proyecto
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Construir la app (asume script "build" en package.json)
RUN npm run build

# ---------- STAGE 2: serve con nginx ----------
FROM nginx:stable-alpine AS production

# Eliminar el default.conf de nginx y copiar uno propio
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos al directorio público de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer puerto (80 por defecto)
EXPOSE 80

# Comando por defecto ya viene en la imagen nginx
CMD ["nginx", "-g", "daemon off;"]