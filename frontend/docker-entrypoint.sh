#!/bin/sh
set -e

# ========== LEER VARIABLES DE VAULT ==========
if [ -f /vault/secrets/config.env ]; then
  echo "📄 Leyendo variables de Vault..."
  set -a
  source /vault/secrets/config.env
  set +a
else
  echo "⚠️  No se encontró /vault/secrets/config.env"
  echo "ℹ️  Usando valores por defecto..."
  export VITE_API_URL=${VITE_API_URL:-http://localhost:3000}
  export VITE_IMAGE_API_URL=${VITE_IMAGE_API_URL:-http://localhost:3000}
fi

# ========== VERIFICAR QUE EXISTEN LAS VARIABLES ==========
echo "✅ VITE_API_URL: ${VITE_API_URL}"
echo "✅ VITE_IMAGE_API_URL: ${VITE_IMAGE_API_URL}"

# ========== GENERAR CONFIG DE NGINX CON envsubst ==========
echo "🔧 Generando configuración de Nginx..."
envsubst '${VITE_API_URL},${VITE_IMAGE_API_URL}' \
  < /etc/nginx/conf.d/default.conf.template \
  > /etc/nginx/conf.d/default.conf

echo "📝 Configuración generada:"
cat /etc/nginx/conf.d/default.conf

# ========== INICIAR NGINX ==========
echo "🚀 Iniciando Nginx..."
nginx -g "daemon off;"
