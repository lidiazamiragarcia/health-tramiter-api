# Estructura del proyecto — Backend

Organización actual (JavaScript, migración a TypeScript planificada):

```text
health-tramiter-api/
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   ├── README.md
│   └── migrations/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── database.js
│   │   ├── env.js
│   │   └── knex.js
│   ├── constants/
│   ├── core/
│   │   ├── controllers/
│   │   ├── exceptions/
│   │   └── responses/
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── ...
│   ├── modules/
│   │   ├── auth/
│   │   ├── usuarios/
│   │   ├── roles/
│   │   ├── tipos-identificacion/
│   │   └── tramites/
│   ├── routes/
│   │   └── index.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── pagination.js
│   └── validators/
├── knexfile.js
├── .env.example
└── package.json
```

## Convención por módulo

Cada módulo en `src/modules/<nombre>/`:

```text
index.js          → exporta routes
<nombre>.routes.js
<nombre>.controller.js
<nombre>.service.js
<nombre>.repository.js
<nombre>.query.js
<nombre>.validator.js
```

## Rutas montadas (`/api/v1`)

- `/auth`
- `/usuarios`
- `/roles`
- `/tipos-identificacion`
- `/tramites`

## Convenciones

- Código en inglés; documentación en español.
- Sin lógica de negocio en controllers ni routes.
- Sin SQL fuera de `*.query.js`.
- Configuración solo vía variables de entorno.
