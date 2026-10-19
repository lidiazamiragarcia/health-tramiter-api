# Arquitectura — Backend (Health Tramiter API)

## Resumen

API REST en **Node.js + Express** con arquitectura por capas y persistencia en **MySQL**. Autenticación **JWT** (access + refresh) con sesiones revocables en BD.

## Capas

```text
Routes → Controller → Service → Repository → Query (SQL)
                ↑
         Validators / Middlewares
```

| Capa | Responsabilidad |
|------|-----------------|
| **Routes** | Definir endpoints y middlewares |
| **Controller** | HTTP: parsear request, invocar service, formatear respuesta |
| **Service** | Lógica de negocio, permisos por rol |
| **Repository** | Orquestación de acceso a datos |
| **Query** | SQL parametrizado (único lugar con consultas) |

## Módulos

- `auth` — login, registro, JWT, refresh, logout, reset password
- `usuarios` — CRUD, perfil `/me`, registro público
- `roles` — catálogo de roles (ADMIN only)
- `tipos-identificacion` — catálogo documentos
- `tramites` — ciclo de vida de trámites y asignación a tramitador

## Seguridad

- Contraseñas con **bcrypt** (`SALT_ROUNDS`).
- **JWT HS256** (`jsonwebtoken`): access en JSON, refresh en cookie HttpOnly.
- Middleware `auth.middleware` valida Bearer token.
- Middleware `role.middleware` autoriza por rol (`ADMIN`, `USER`, `TRAMITADOR`).
- Validación de entrada con **express-validator**.

## Base de datos

- Script canónico: `database/schema.sql`.
- Datos iniciales: `database/seed.sql`.
- Migraciones incrementales: Knex en `database/migrations/`.
- Pool de conexiones: `mysql2` vía `src/config/database.js`.

## Respuestas API

Formato uniforme (`ApiResponse`):

```json
{ "success": true, "message": "", "data": {}, "errors": null }
```

## Trámites — reglas de negocio

1. USER crea trámite → estado `PENDIENTE`, sin tramitador.
2. TRAMITADOR lista `/tramites/disponibles` (paginado, solo pendientes libres).
3. TRAMITADOR `POST /tramites/:id/tomar` → asignación atómica, estado `EN_PROCESO`.
4. USER ve tramitador asignado en su listado.
5. ADMIN acceso total; solo ADMIN elimina trámites.

## Pendiente / mejoras futuras

- Helmet, rate limiting, logging estructurado (pino/winston).
- Migración gradual a TypeScript.
- Tests unitarios e integración.
- Módulos: documentos, notificaciones, EPS.

## Decisiones

- SQL explícito en `*.query.js` (no ORM) para control y claridad.
- Knex solo para migraciones, no como ORM de runtime.
- Refresh token persistido en `user_sessions` para revocación en logout.
