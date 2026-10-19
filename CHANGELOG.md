# Changelog — Health Tramiter API

## [1.1.0] - 2026-08-28

### Añadido
- Módulo **trámites**: CRUD, toma por tramitador, listados por rol, paginación en disponibles.
- Roles `TRAMITADOR` y permisos por rol en trámites.
- Columnas `assigned_tramitador_id` y `assigned_at` en tabla `tramites`.
- Migración Knex `002_tramite_assignment.js`.
- Utilidad de paginación (`src/utils/pagination.js`).
- `database/README.md` con documentación de BD.

### Cambiado
- `schema.sql` y `seed.sql` actualizados (usuarios ADMIN/USER/TRAMITADOR, hashes bcrypt verificados).
- README y documentación alineados con funcionalidad actual.
- `.env.example` con `JWT_REFRESH_EXPIRES` y puerto 3001.

### Eliminado
- Tabla y API `tramitador_contacts` (reemplazada por toma directa de trámites).

## [1.0.0] - 2026-08-20

- MVP inicial: auth JWT, usuarios, roles, tipos de identificación.
- Arquitectura por capas y `database/schema.sql`.
