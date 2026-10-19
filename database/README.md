# Base de datos — Health Tramiter

MySQL 8+ (recomendado). Charset: `utf8mb4`.

## Archivos

| Archivo | Propósito |
|---------|-----------|
| `schema.sql` | Crea BD, tablas, índices, FKs y vista `user_dashboard_stats` |
| `seed.sql` | Roles, tipos de ID, usuarios demo y trámite de ejemplo |
| `migrations/001_initial_schema.js` | Ejecuta `schema.sql` vía Knex |
| `migrations/002_tramite_assignment.js` | Añade `assigned_tramitador_id` / `assigned_at` en instalaciones previas |

## Instalación desde cero

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

## Tablas

| Tabla | Descripción |
|-------|-------------|
| `roles` | ADMIN, USER, TRAMITADOR |
| `identification_types` | CC, CE, PA, TI |
| `users` | Usuarios del sistema |
| `password_reset_tokens` | Tokens de recuperación de contraseña |
| `user_sessions` | Refresh tokens / sesiones JWT |
| `tramites` | Solicitudes con asignación opcional de tramitador |
| `audit_logs` | Auditoría de acciones |
| `user_preferences` | Preferencias por usuario |

## Usuarios iniciales (seed)

| Rol | Email | Contraseña |
|-----|-------|------------|
| ADMIN | `z.ami98@hotmail.com` | `Admin123!` |
| USER | `usuario@health-tramiter.local` | `User123!` |
| TRAMITADOR | `tramitador@health-tramiter.local` | `Tramitador123!` |

El seed es idempotente (`ON DUPLICATE KEY UPDATE` / `INSERT IGNORE` donde aplica).

## Trámite de ejemplo

Se inserta un trámite **PENDIENTE** para el usuario María, disponible para que un tramitador lo tome desde la app.

## Migraciones en BD existente

Si ya tenías una versión anterior sin columnas de asignación:

```bash
npm run migrate
# o solo la 002 si 001 ya falló por tablas existentes
```

## Respaldo

No versionar dumps con datos reales. Usar carpeta local `database/backups/` (ignorada por git).
