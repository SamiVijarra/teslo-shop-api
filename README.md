Teslo Shop API 👕

API REST de una tienda de indumentaria (e-commerce) construida con NestJS y TypeScript. Incluye autenticación con JWT y roles, gestión de productos con imágenes, carga de archivos, un módulo de WebSockets para mensajería en tiempo real, y un endpoint seed protegido para poblar la base de datos.

Tecnologías
NestJS + TypeScript
PostgreSQL + TypeORM
Passport + JWT para autenticación
Socket.IO para WebSockets
Swagger para documentación de la API
Docker + Docker Compose
class-validator + class-transformer
Características
Autenticación con JWT y sistema de roles (admin, super-user, user)
CRUD completo de productos, con imágenes asociadas y paginación
Carga y consulta de imágenes de productos
Módulo de WebSockets (Socket.IO) para mensajería en tiempo real entre usuarios autenticados
Endpoint seed protegido por rol para poblar la base de datos con datos de prueba
Validación de datos con DTOs y ValidationPipe global
Transacciones con QueryRunner para operaciones consistentes
Documentación interactiva con Swagger
Arquitectura modular con NestJS
Configuración Docker para levantar PostgreSQL
Endpoints principales
Método	Ruta	Descripción
POST	/api/auth/register	Registrar un nuevo usuario
POST	/api/auth/login	Iniciar sesión y obtener JWT
GET	/api/auth/check-status	Validar token y renovar sesión
GET	/api/products	Listar productos con paginación
GET	/api/products/:term	Obtener un producto por id, título o slug
POST	/api/products	Crear un producto (requiere autenticación)
PATCH	/api/products/:id	Actualizar un producto (requiere rol admin)
DELETE	/api/products/:id	Eliminar un producto (requiere rol admin)
POST	/api/files/product	Subir una imagen de producto
GET	/api/files/product/:image	Obtener una imagen de producto
GET	/api/seed	Poblar la base de datos (requiere rol admin)
Instalación y uso
Requisitos
Node.js 18+
Docker y Docker Compose
Desarrollo
Clonar el repositorio
git clone https://github.com/SamiVijarra/teslo-shop-api.git
cd teslo-shop-api
Instalar dependencias
npm install
Configurar variables de entorno
cp .env.template .env

Completar el .env con:

DB_PASSWORD=
DB_NAME=
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
PORT=3000
HOST_API=http://localhost:3000
JWT_SECRET=
Levantar la base de datos con Docker
docker-compose up -d
Iniciar en desarrollo
npm run start:dev
Poblar la base de datos

El endpoint del seed está protegido y requiere un token de un usuario con rol admin o super-user:

GET http://localhost:3000/api/seed
Authorization: Bearer <tu_token_jwt>
Documentación de la API

Con el proyecto corriendo, la documentación interactiva de Swagger está disponible en:

http://localhost:3000/api
Estructura del proyecto
src/
├── auth/          # Registro, login, JWT, guards y decoradores de roles
├── products/       # CRUD de productos e imágenes asociadas
├── files/          # Carga y consulta de imágenes
├── messages-ws/     # Gateway de WebSockets para mensajería en tiempo real
├── seed/            # Módulo protegido para poblar la base de datos
├── common/          # DTOs y utilidades compartidas
└── main.ts          # Punto de entrada con ValidationPipe global y Swagger
Autor

Samanta Vijarra — github.com/SamiVijarra