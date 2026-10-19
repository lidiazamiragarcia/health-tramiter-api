# Config

Configuración central del backend.

| Archivo | Uso |
|---------|-----|
| `env.js` | Variables de entorno (DB, JWT, SALT_ROUNDS) |
| `database.js` | Pool MySQL (`mysql2`) |
| `knex.js` | Cliente Knex para migraciones |

Nunca hardcodear secretos. Usar `.env` (ver `.env.example`).
