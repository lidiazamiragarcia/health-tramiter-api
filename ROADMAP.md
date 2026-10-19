# Roadmap — Backend

## Completado

- [x] Auth JWT (access + refresh, logout, revocación en BD)
- [x] Registro, login, recuperación y reset de contraseña
- [x] CRUD usuarios, roles, tipos de identificación
- [x] Autorización por rol (ADMIN, USER, TRAMITADOR)
- [x] Módulo trámites con toma y gestión por tramitador
- [x] Paginación en trámites disponibles
- [x] Knex migrations (schema + asignación)
- [x] Seed con usuarios demo

## En progreso / corto plazo

- [ ] Tests unitarios (services) e integración (auth, trámites)
- [ ] Helmet + rate limiting
- [ ] Logging estructurado
- [ ] CI (lint, check, migrate dry-run)

## Mediano plazo

- [ ] Migración gradual a TypeScript
- [ ] Módulo documentos adjuntos a trámites
- [ ] Notificaciones (email / in-app)
- [ ] Auditoría activa en `audit_logs`
- [ ] API OpenAPI / Swagger

## Largo plazo

- [ ] Integración EPS / terceros
- [ ] Reportes y métricas de dashboard
- [ ] Multi-tenant o multi-sede (si aplica negocio)
