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

# Instalar gettext para envsubst
RUN apk add --no-cache gettext

# Copiar template de configuración
COPY default.conf.template /etc/nginx/conf.d/default.conf.template 

# Copiar los archivos construidos
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar script y convertir formato de línea + hacer ejecutable
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN dos2unix /docker-entrypoint.sh 2>/dev/null || sed -i 's/\r$//' /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

# Exponer puerto
EXPOSE 80

# Usar el script de entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]