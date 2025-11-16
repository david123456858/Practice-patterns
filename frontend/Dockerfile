# ---------- STAGE 1: build ----------
FROM node:18-alpine AS builder
WORKDIR /app

# Instalar dependencias del sistema
RUN apk add --no-cache bash git

# Copiar package.json y package-lock
COPY package*.json ./

# Instalar dependencias
RUN npm ci --silent

# Copiar el resto del proyecto
COPY . .

# Construir la app SIN variables de entorno hardcodeadas
RUN npm run build

# ---------- STAGE 2: serve con nginx ----------
FROM nginx:stable-alpine AS production

# Eliminar el default.conf de nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf.template /etc/nginx/conf.d/default.conf.template 

# Copiar los archivos construidos
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar script para inyectar variables en runtime
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Exponer puerto
EXPOSE 80

# Usar el script de entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]