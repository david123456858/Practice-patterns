# Practice-patterns — Ecomove (Iniciativa para una Colombia más limpia)

Resumen
-------
Este repositorio (Practice-patterns) contiene el esqueleto de una aplicación orientada a la iniciativa "Ecomove": una plataforma para apoyar acciones de recolección, logística y concientización ambiental en Colombia. El objetivo final de Ecomove es facilitar la coordinación entre ciudadanos, organizaciones y servicios municipales para promover una Colombia más limpia mediante recolección selectiva, programación de rutas, agendamiento de recolecciones y visualización de datos.

Lo que encontrarás en este README
- Para qué sirve el proyecto.
- La visión de la iniciativa Ecomove.
- Estado actual del repositorio.
- Cómo está distribuido (estructura de carpetas y archivos importantes).
- Indicaciones básicas para ponerlo a correr localmente.
- Tecnologías y notas para colaborar.

Propósito del proyecto
----------------------
Ecomove busca:
- Permitir que ciudadanos soliciten recolecciones de residuos reciclables.
- Coordinar voluntarios y equipos de recolección.
- Registrar puntos limpios y rutas para optimizar la logística.
- Mostrar métricas e historial (volumen recolectado, zonas atendidas).
- Generar material de difusión y una base de datos que permita tomar decisiones municipales y comunitarias.

Estado actual (visión general)
------------------------------
Este repositorio contiene una arquitectura dividida en backend y frontend, además de recursos auxiliares (imágenes de servicios, diagramas UML, etc.). En la estructura actual hay la base sobre la cual construir las funcionalidades descritas arriba: API, configuración de la base de datos/ORM, y la aplicación cliente con Vite.

Estructura del repositorio
--------------------------
A continuación la distribución principal de carpetas y archivos que hay en la rama principal del repositorio:

- .gitignore
- .vite/                       — Directorio temporal / cache de Vite (frontend)
- Backend/                     — Código del servidor (API, configuración, Docker)
  - .dockerignore
  - Dockerfile
  - drizzle.config.ts          — Configuración para Drizzle (ORM/gestión esquema)
  - drizzle/                   — Módulo o definiciones relacionadas con Drizzle
  - example.http               — Colección de peticiones / ejemplos de API (para probar endpoints)
  - package.json               — Dependencias y scripts del backend
  - tsconfig.json              — Configuración TypeScript del backend
  - src/                       — Código fuente del backend (endpoints, modelos, lógica)
  - UMls/                      — Diagramas UML o documentación de diseño (nombre sugiere UMLs)
- frontend/                    — Código del cliente (aplicación web construida con Vite)
- ServiceImages/               — Imágenes y assets de servicios (íconos, mockups, etc.)
- README.md                    — Este archivo (descripción del proyecto)

Notas sobre la distribución
- Backend: el uso de tsconfig.json y archivos .ts sugiere que está escrito en TypeScript. La presencia de drizzle.config.ts y la carpeta drizzle indican empleo de Drizzle (u otro sistema similar) para interactuar con la base de datos.
- Dockerfile y .dockerignore en Backend facilitan el despliegue del servicio en contenedores.
- El archivo example.http suele usarse para agrupar ejemplos de llamadas HTTP (útil con extensiones como REST Client).
- Frontend: la presencia de .vite y la carpeta frontend indican una aplicación moderna basada en Vite (posiblemente con React, Vue o similar — revisar el contenido de frontend para confirmar).

Cómo empezar (indicaciones generales)
-------------------------------------
Estos pasos son orientativos: revisa package.json en cada carpeta (Backend y frontend) para confirmar nombres de scripts.

1. Backend (local)
   - Entrar a la carpeta Backend:
     cd Backend
   - Instalar dependencias:
     npm install
     (o pnpm install / yarn según prefieras)
   - Revisar scripts en package.json y ejecutar:
     npm run dev   (o npm start / npm run build según la configuración)
   - Para Docker:
     - Construir la imagen con el Dockerfile incluido.
     - Usar .dockerignore para optimizar contexto de construcción.

2. Frontend (local)
   - Entrar a la carpeta frontend:
     cd frontend
   - Instalar dependencias:
     npm install
   - Levantar el servidor de desarrollo (revisar package.json):
     npm run dev

3. Base de datos / migraciones
   - Revisa drizzle.config.ts y la carpeta drizzle para ver la configuración y comandos disponibles para migraciones o gestión del esquema.
   - Crea las variables de entorno necesarias (URI de la base de datos, claves, etc.) antes de iniciar el backend.

4. Probar la API
   - Usa example.http (Backend/example.http) como colección de pruebas para ejecutar y verificar endpoints.

Tecnologías esperadas (según estructura)
---------------------------------------
- TypeScript en Backend (tsconfig.json).
- Drizzle ORM (drizzle.config.ts).
- Node.js (package.json).
- Vite en frontend (.vite, carpeta frontend).
- Contenerización con Docker (Dockerfile).
- Assets y documentación en ServiceImages y UMls.

Visión de Ecomove — por qué importa
-----------------------------------
Ecomove es más que una app: es una plataforma de impacto social. Al facilitar la conexión entre ciudadanos que generan residuos reciclables y quienes pueden recolectarlos (voluntarios, pequeñas empresas de reciclaje, servicios municipales), se:
- Reduce la cantidad de residuos mal dispuestos en el entorno.
- Se incentiva la separación en la fuente y la economía circular local.
- Se genera información útil para planear campañas y asignar recursos.
- Se promueve la educación ambiental y la participación comunitaria.

Buenas prácticas y recomendaciones
----------------------------------
- Mantener las variables sensibles fuera del repositorio (usar archivos .env y añadirlos a .gitignore).
- Documentar los endpoints en el example.http y/o agregar Swagger/OpenAPI si se desea.
- Añadir instrucciones de despliegue y CI/CD (GitHub Actions) para facilitar integraciones y despliegues automatizados.
- Completar los diagramas UML en UMls para que nuevos colaboradores comprendan el diseño.

Cómo colaborar
---------------
- Clona el repositorio y crea una rama por cada feature o corrección:
  git checkout -b feature/mi-nombre
- Añade tests donde sea posible y actualiza la documentación.
- Abre pull requests con descripción clara de los cambios y el estado de pruebas.

Contacto
--------
Si eres parte del equipo de Ecomove o quieres sumarte a la iniciativa, comenta en el repositorio o crea una issue proponiendo ideas, tareas o mejoras.

Cuerpos de peticiones importantes (ejemplos)
--------------------------------------------
A continuación se muestran ejemplos de los cuerpos (payloads) y cabeceras para las peticiones más importantes. Ajusta los campos según el modelo de datos real en Backend/src.

1) Registro de usuario (POST /api/auth/register)
Headers:
- Content-Type: application/json

Body (ejemplo):
{
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "password": "PasswordSeguro123",
  "role": "citizen"   // possible values: citizen, volunteer, admin
}

Respuesta esperada: 201 Created
{
  "id": "uuid",
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "role": "citizen",
  "createdAt": "2025-11-11T00:00:00Z"
}

2) Login (POST /api/auth/login)
Headers:
- Content-Type: application/json

Body:
{
  "email": "juan.perez@example.com",
  "password": "PasswordSeguro123"
}

Respuesta: 200 OK
{
  "token": "jwt.token.here",
  "expiresIn": 3600
}

3) Solicitud de recolección (POST /api/requests)
Headers:
- Content-Type: application/json
- Authorization: Bearer <token>

Body:
{
  "userId": "uuid",            // quien solicita
  "address": {
    "street": "Calle 45 #12-34",
    "city": "Bogotá",
    "lat": 4.7110,
    "lng": -74.0721
  },
  "items": [
    { "type": "plastic", "quantityKg": 2.5 },
    { "type": "paper", "quantityKg": 1.0 }
  ],
  "preferredDate": "2025-11-20T09:00:00Z",
  "notes": "Dejar en la entrada"
}

Respuesta: 201 Created
{
  "requestId": "uuid",
  "status": "pending",
  "scheduledAt": null
}

4) Voluntario se ofrece para recolección (POST /api/volunteers/signup)
Headers:
- Content-Type: application/json
- Authorization: Bearer <token>

Body:
{
  "userId": "uuid",
  "vehicle": "Bicicleta",
  "areas": ["Localidad 1", "Localidad 2"],
  "availableHours": "08:00-17:00"
}

Respuesta: 200 OK
{
  "volunteerId": "uuid",
  "status": "active"
}

5) Crear ruta (POST /api/routes)
Headers:
- Content-Type: application/json
- Authorization: Bearer <token> (admin/dispatcher)

Body:
{
  "routeName": "Ruta A",
  "vehicleId": "uuid",
  "stops": [
    { "address": "Calle 1 #1-1", "lat": 4.7, "lng": -74.0, "estimatedTime": "2025-11-20T08:30:00Z" },
    { "address": "Calle 2 #2-2", "lat": 4.71, "lng": -74.01, "estimatedTime": "2025-11-20T09:00:00Z" }
  ]
}

Respuesta: 201 Created
{
  "routeId": "uuid",
  "status": "scheduled"
}

6) Obtener métricas (GET /api/metrics)
Headers:
- Authorization: Bearer <token>

Query params: ?from=2025-01-01&to=2025-11-01

Respuesta: 200 OK
{
  "totalCollectedKg": 1234.5,
  "byType": { "plastic": 500.2, "paper": 300.1, "metal": 434.2 },
  "topZones": [ { "zone": "Localidad 1", "kg": 400 }, { "zone": "Localidad 2", "kg": 300 } ]
}

Consideraciones de seguridad y validación
- Validar y sanitizar todas las entradas (email, textos, coordenadas).
- Limitar tamaños de archivos y payloads.
- Usar HTTPS en producción y proteger el token JWT (expiración, refresh token).
- Manejar roles y permisos a nivel de middleware (admin, volunteer, citizen).

Arquitectura y patrones técnicos sugeridos
-----------------------------------------
A continuación se describen arquitecturas y patrones recomendados para mantener el proyecto mantenible y escalable.

1) Arquitectura propuesta (Layered / Hexagonal híbrida)
- Capa de presentación (Controllers / Routes): maneja HTTP, validación de petición y respuestas.
- Capa de aplicación (Services / Use Cases): contiene la lógica de negocio orquestando repositorios y servicios externos.
- Capa de dominio (Models / Entities): definiciones de entidades y reglas de negocio puras.
- Capa de infraestructura (Repositories / Drivers): acceso a base de datos, colas, servicios externos (SMS, email, maps).

Consejo: aplicar principios de Hexagonal para que la lógica de negocio no dependa de frameworks (por ejemplo Express).

2) Patrones de diseño comunes
- Repository Pattern: separar acceso a datos (Drizzle/ORM) de la lógica de negocio.
- DTOs (Data Transfer Objects): usar objetos para entrada/salida y para mapear entidades.
- Service Layer: encapsular operaciones complejas (crear ruta, asignar voluntarios).
- Factory/Builder: para construir objetos complejos (rutas con múltiples paradas).
- Event-Driven / Pub-Sub: para acciones asíncronas (notificaciones, generación de reportes, cálculo de métricas). Usar una cola (RabbitMQ, Redis Streams, SQS).
- Circuit Breaker/Retry: para llamadas externas (APIs de mapas, servicios SMS).

3) Autenticación y autorización
- JWT para autenticación con access + refresh tokens.
- Roles y permisos (RBAC) para endpoints sensibles (crear rutas, ver métricas).
- Rate limiting y protección contra brute-force en endpoints de auth.

4) Persistencia y migraciones
- Usar Drizzle o un ORM que soporte migraciones y tipado.
- Mantener scripts de migración en carpeta drizzle/ y controlarlos con CI.

5) Observabilidad
- Logging estructurado (p.ej. pino, winston) y correlación de requestId.
- Metrics (Prometheus) y tracing (OpenTelemetry) para operaciones críticas.
- Alertas para errores críticos y fallos en jobs asíncronos.

6) Tests
- Unit tests para lógica de negocio.
- Integration tests para endpoints usando una DB en memoria o docker-compose.
- End-to-end tests para flujos críticos (registro, solicitud, asignación, recolección).

7) Despliegue y CI/CD
- Dockerizar backend y frontend.
- Pipelines para build, tests, lint y despliegue automático a staging/production.
- Variables de entorno gestionadas por el proveedor (GitHub Actions Secrets, AWS Parameter Store, etc.).

Buenas prácticas de código
- Mantener funciones pequeñas y con una sola responsabilidad.
- Tipado estricto en TypeScript (no any), usar eslint y prettier.
- Documentar contratos HTTP y actualizar example.http o usar OpenAPI.

Cierre
-----
He añadido una sección con ejemplos de cuerpos de las peticiones más importantes y un resumen de arquitecturas y patrones técnicos recomendados para que el equipo pueda desarrollar Ecomove con mejores prácticas. Ahora puedes:

- Revisar estos ejemplos y adaptarlos al modelo real en Backend/src.
- Indicar si quieres que agregue OpenAPI/Swagger, pruebas de ejemplo o plantillas de solicitud para example.http.

Gracias — procedí a actualizar README.md en la rama principal con estos cambios.