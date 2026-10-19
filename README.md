# Health Tramiter API

API REST para autenticación, administración de usuarios/roles y gestión de trámites del sector salud.

**Stack:** Node.js 18+, Express, MySQL, Knex, JWT (HS256), bcrypt, express-validator.

## Funcionalidad actual

| Módulo | Descripción |
|--------|-------------|
| **Auth** | Login, registro, logout, refresh token, recuperación y reset de contraseña |
| **Usuarios** | CRUD (admin), registro público, perfil `/usuarios/me` |
| **Roles** | CRUD (solo ADMIN): `ADMIN`, `USER`, `TRAMITADOR` |
| **Tipos de identificación** | Catálogo CC, CE, PA, TI |
| **Trámites** | Creación por usuario, toma por tramitador, gestión por rol, paginación en disponibles |

### Modelo de permisos (trámites)

- **ADMIN:** ve y gestiona todos los trámites.
- **USER:** crea y consulta solo sus trámites; ve quién lo gestiona.
- **TRAMITADOR:** toma trámites pendientes de una lista paginada; gestiona solo los que ha tomado.

## Estructura del proyecto

```text
src/
  config/          # env, database, knex
  constants/       # rutas, HTTP status, mensajes
  core/            # controllers base, responses, exceptions
  middlewares/     # auth, roles, validación, errores
  modules/
    auth/
    usuarios/
    roles/
    tipos-identificacion/
    tramites/
  routes/          # index.js
  utils/           # jwt, pagination
  validators/
database/
  schema.sql       # esquema completo
  seed.sql         # datos iniciales
  migrations/      # Knex (001 schema, 002 asignación trámites)
```

Las consultas SQL viven en `*.query.js` de cada módulo.

## Instalación

```bash
cp .env.example .env
npm install
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
npm run dev
```

La API queda en `http://localhost:3001` (configurable con `PORT`).

### Alternativa con Knex

```bash
npm run migrate
mysql -u root -p < database/seed.sql
npm run dev
```

## Variables de entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3001` |
| `DB_HOST` | Host MySQL | `127.0.0.1` |
| `DB_PORT` | Puerto MySQL | `3306` |
| `DB_DATABASE` | Nombre de BD | `health_tramiter` |
| `DB_USER` / `DB_PASSWORD` | Credenciales MySQL | — |
| `SALT_ROUNDS` | Rounds bcrypt | `10` |
| `JWT_SECRET` | Secreto firma JWT | **obligatorio** |
| `JWT_EXPIRES` | Access token (segundos) | `3600` |
| `JWT_REFRESH_EXPIRES` | Refresh token (segundos) | `604800` |

> **Nunca** subas `.env` al repositorio. Usa `.env.example` como plantilla.

## Autenticación JWT

- **Access token:** respuesta JSON del login → header `Authorization: Bearer <token>`.
- **Refresh token:** cookie HttpOnly `refreshToken` + registro en `user_sessions`.
- **Logout:** revoca sesión en BD y limpia cookie.
- **Refresh:** `POST /api/v1/auth/refresh` renueva el access token.

## Usuarios de prueba (seed)

| Rol | Email | Contraseña |
|-----|-------|------------|
| ADMIN | `z.ami98@hotmail.com` | `Admin123!` |
| USER | `usuario@health-tramiter.local` | `User123!` |
| TRAMITADOR | `tramitador@health-tramiter.local` | `Tramitador123!` |

## API

Base: `/api/v1`  
Formato de respuesta: `{ "success": true, "message": "", "data": {}, "errors": null }`

### Salud y auth

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/health` | No | Estado del servicio |
| POST | `/auth/login` | No | Inicio de sesión |
| POST | `/auth/register` | No | Registro |
| POST | `/auth/logout` | Cookie | Cierre de sesión |
| POST | `/auth/refresh` | Cookie | Renovar access token |
| POST | `/auth/forgot-password` | No | Solicitar reset |
| POST | `/auth/reset-password` | No | Restablecer contraseña |

### Usuarios

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/usuarios` | No | Registro |
| GET | `/usuarios/me` | Sí | Perfil del usuario autenticado |
| GET/PUT/DELETE | `/usuarios`, `/usuarios/:id` | ADMIN | CRUD usuarios |

### Roles y catálogos

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| CRUD | `/roles` | ADMIN | Gestión de roles |
| CRUD | `/tipos-identificacion` | Según módulo | Tipos de documento |

### Trámites

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/tramites/disponibles?page=&pageSize=` | TRAMITADOR | Lista paginada (pendientes, sin asignar) |
| GET | `/tramites/asignados` | TRAMITADOR | Trámites tomados por el tramitador |
| GET | `/tramites` | Sí | Lista según rol |
| GET | `/tramites/:id` | Sí | Detalle |
| POST | `/tramites` | Sí | Crear (USER crea el suyo) |
| POST | `/tramites/:id/tomar` | TRAMITADOR | Tomar trámite |
| PUT | `/tramites/:id` | Sí | Actualizar |
| DELETE | `/tramites/:id` | ADMIN | Eliminar |

Estados de trámite: `PENDIENTE`, `EN_PROCESO`, `COMPLETADO`, `RECHAZADO`.

## Scripts npm

```bash
npm run dev              # desarrollo (nodemon)
npm start                # producción
npm run migrate          # aplicar migraciones Knex
npm run migrate:rollback # revertir última migración
npm run check            # syntax check JS
```

## Base de datos

Ver [`database/README.md`](database/README.md) para detalle de tablas, seed y migraciones.

## Documentación adicional

- [`ARCHITECTURE.md`](ARCHITECTURE.md) — decisiones arquitectónicas
- [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md) — organización del código
- [`CHANGELOG.md`](CHANGELOG.md) — historial de cambios
- [`ROADMAP.md`](ROADMAP.md) — próximos pasos
- [`AGENTS.md`](AGENTS.md) — reglas para agentes de IA

## Seguridad (producción)

- `JWT_SECRET` fuerte y único por entorno.
- HTTPS + cookie `secure: true` para refresh token.
- CORS limitado al dominio del frontend.
- Considerar helmet, rate limiting y logging estructurado.
