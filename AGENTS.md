# AGENTS.md

# Health Tramiter API

Versión: 1.0

---

# PROPÓSITO

Este documento define el comportamiento esperado de cualquier agente de Inteligencia Artificial que participe en el desarrollo del Backend del proyecto Health Tramiter.

Su objetivo es garantizar una arquitectura consistente, escalable y mantenible, independientemente del modelo de IA utilizado.

Estas reglas son obligatorias.

---

# TECNOLOGÍAS

El Backend deberá desarrollarse utilizando:

- Node.js
- Express.js
- MySQL
- JWT
- bcrypt
- TypeScript (si el proyecto adopta TS)
- Arquitectura modular
- API REST

No introducir nuevas tecnologías sin una justificación técnica.

---

# IDIOMA

Código:

Inglés.

Documentación:

Español.

Respuestas del agente:

Español.

Nunca mezclar idiomas.

---

# OBJETIVO DEL BACKEND

El Backend será el único responsable de:

- Lógica del negocio.
- Seguridad.
- Persistencia.
- Validaciones.
- Autenticación.
- Autorización.
- Gestión de usuarios.
- Gestión de roles.
- Exposición de API REST.

El Frontend nunca deberá implementar lógica del negocio.

---

# ALCANCE DEL MVP (implementado y en evolución)

Módulos implementados:

- Autenticación (JWT access + refresh, logout, recuperación de contraseña)
- Usuarios y roles (ADMIN, USER, TRAMITADOR)
- Perfil (`/usuarios/me`)
- Trámites (creación, toma por tramitador, gestión por rol, paginación)
- Tipos de identificación

Pendiente / fuera de alcance actual:

- Documentos adjuntos
- Notificaciones
- Integración EPS
- Reportes avanzados

No implementar módulos no acordados sin actualizar documentación.

---

# ARQUITECTURA

Toda la lógica deberá separarse correctamente.

Como referencia:

src/

config/

controllers/

services/

repositories/

middlewares/

validators/

routes/

models/

database/

utils/

helpers/

constants/

types/

logs/

tests/

La estructura definitiva deberá adaptarse al proyecto existente.

---

# RESPONSABILIDADES

## Routes

Únicamente definir endpoints.

Nunca contener lógica.

---

## Controllers

Recibir peticiones.

Validar parámetros básicos.

Invocar Services.

Construir respuestas HTTP.

Nunca contener lógica del negocio.

---

## Services

Toda la lógica del negocio deberá implementarse aquí.

No duplicar reglas.

Mantener alta reutilización.

---

## Repositories

Toda interacción con la base de datos deberá centralizarse aquí.

Nunca consultar la base de datos desde Controllers.

Nunca consultar la base de datos desde Routes.

---

## Validators

Centralizar todas las validaciones.

Evitar reglas duplicadas.

Utilizar validaciones reutilizables.

---

## Middlewares

Únicamente:

Autenticación.

Autorización.

Rate limiting.

Logs.

Errores.

Nunca lógica del negocio.

---

# BASE DE DATOS

Toda consulta deberá:

Ser parametrizada.

Evitar SQL concatenado.

Mantener consistencia.

Preparar futuras transacciones.

---

# SEGURIDAD

Implementar:

JWT

bcrypt

Helmet

CORS

Rate Limiting

Sanitización

Validaciones

Nunca almacenar contraseñas en texto plano.

Nunca exponer información sensible.

Nunca registrar tokens.

Nunca registrar contraseñas.

---

# AUTENTICACIÓN

El sistema deberá prepararse para:

Login.

Logout.

Refresh Token.

Roles.

Permisos.

Revocación de sesión.

JWT.

Toda autenticación deberá centralizarse.

---

# AUTORIZACIÓN

Separar claramente:

Autenticación.

Permisos.

Roles.

No mezclar responsabilidades.

---

# API

Toda la API deberá seguir una convención uniforme.

Ejemplo:

/api/v1/

Las respuestas deberán mantener el mismo formato.

Ejemplo:

{
    "success": true,
    "message": "",
    "data": {},
    "errors": [],
    "timestamp": ""
}

Nunca responder con estructuras diferentes para endpoints similares.

---

# CÓDIGOS HTTP

Utilizar correctamente:

200

201

204

400

401

403

404

409

422

500

No devolver siempre HTTP 200.

---

# VARIABLES DE ENTORNO

Toda configuración deberá provenir de:

.env

Nunca escribir:

Contraseñas.

Secretos.

URLs.

Credenciales.

Dentro del código.

---

# LOGS

Registrar únicamente información útil.

No generar logs excesivos.

No registrar información sensible.

---

# DOCUMENTACIÓN

Toda nueva funcionalidad deberá actualizar:

README.md

ARCHITECTURE.md

API.md

CHANGELOG.md

Cuando corresponda.

---

# TESTING

Toda arquitectura deberá facilitar:

Pruebas unitarias.

Pruebas de integración.

Pruebas de API.

No acoplar el código dificultando las pruebas.

---

# CALIDAD

Todo el código deberá respetar:

SOLID

DRY

KISS

YAGNI

Clean Code

Clean Architecture

Separación de responsabilidades.

---

# REUTILIZACIÓN

Antes de crear:

Controller

Service

Repository

Validator

Middleware

Helper

Utilidad

Comprobar si ya existe uno similar.

Duplicar código será considerado un error.

---

# ANTES DE MODIFICAR CÓDIGO

Siempre deberás:

Analizar.

Comprender.

Evaluar impacto.

Buscar reutilización.

Proponer solución.

Implementar.

Validar.

Documentar.

Nunca modificar archivos impulsivamente.

---

# SI EXISTE INFORMACIÓN INSUFICIENTE

No inventar.

No asumir.

No generar configuraciones hipotéticas.

Preguntar antes de continuar.

---

# CUANDO FINALICES UNA TAREA

Antes de responder deberás comprobar:

✔ El proyecto compila.

✔ No existen errores.

✔ No rompiste compatibilidad.

✔ No duplicaste código.

✔ La arquitectura continúa siendo consistente.

✔ Actualizaste la documentación necesaria.

✔ La solución es escalable.

✔ La solución es mantenible.

---

# CONTEXTO DEL DOMINIO

Health Tramiter es una plataforma para la gestión y seguimiento de procesos relacionados con el sector salud.

Durante el MVP el Backend administrará:

- Usuarios y roles (ADMIN, USER, TRAMITADOR)
- Autenticación y sesiones JWT
- Trámites (asignación por toma del tramitador)
- Catálogos base (tipos de identificación)

Toda futura funcionalidad deberá integrarse sobre esta base sin romper la arquitectura existente.

---

# REGLA FUNDAMENTAL

El objetivo del agente no consiste únicamente en escribir código.

El objetivo consiste en construir un Backend profesional, preparado para producción, fácil de mantener, seguro, documentado y escalable.

Toda decisión deberá favorecer la calidad del proyecto por encima de la rapidez de implementación.

## No asumir decisiones arquitectónicas

Si una decisión de arquitectura no está explícitamente documentada, el agente no deberá asumirla.

Deberá:

1. Identificar la incertidumbre.
2. Documentar las posibles alternativas.
3. Solicitar aprobación antes de implementar una decisión que afecte la arquitectura del proyecto.

La ausencia de información nunca deberá interpretarse como autorización para inventar una solución.

======================================================================
BASE DE DATOS
======================================================================

La carpeta:

/Users/jhon/Documents/zami/health-tramiter-api/database

será el directorio oficial para toda la gestión de la base de datos del proyecto.

Antes de crear cualquier archivo deberás analizar completamente el contenido existente de dicha carpeta.

Si la estructura ya existe:

- Reutilizarla.
- Organizarla.
- Completar únicamente los elementos faltantes.
- No eliminar información sin una justificación técnica.

Si la estructura no existe o está incompleta:

Crear una organización profesional preparada para el crecimiento del proyecto.

Como mínimo deberá contemplar:

database/
│
├── schema/
│   ├── 001_create_tables.sql
│   ├── 002_constraints.sql
│   ├── 003_indexes.sql
│   ├── 004_views.sql (si aplica)
│   └── README.md
│
├── migrations/
│
├── seeds/
│
├── backups/
│
├── diagrams/
│
├── docs/
│   ├── DATABASE.md
│   └── RELATIONSHIPS.md
│
└── README.md

La estructura podrá adaptarse si ya existe una organización diferente, siempre que mantenga una separación clara de responsabilidades.

======================================================================
MODELO DE DATOS
======================================================================

El proyecto utilizará MySQL como único motor de base de datos.

Antes de crear nuevas tablas deberás:

- Analizar el modelo existente.
- Identificar tablas reutilizables.
- Revisar relaciones.
- Revisar claves primarias y foráneas.
- Revisar índices.
- Revisar restricciones.
- Mantener compatibilidad siempre que sea posible.

No generar una base de datos completamente nueva si ya existe una estructura inicial.

======================================================================
SCRIPT SQL PRINCIPAL
======================================================================

Deberá existir un script principal que permita construir el esquema completo del MVP.

Este script deberá contener únicamente los elementos correspondientes al MVP.

Como mínimo deberá incluir:

- Creación de la base de datos (si aplica).
- Creación de tablas.
- Relaciones.
- Claves primarias.
- Claves foráneas.
- Índices.
- Restricciones.
- Valores iniciales necesarios para el funcionamiento del sistema (roles, estados básicos, etc.).

No incluir módulos fuera del alcance del MVP.

======================================================================
MIGRACIONES
======================================================================

Si se utiliza un sistema de migraciones:

- Mantener una migración por cambio.
- Nombrarlas de forma consistente.
- No modificar migraciones ya ejecutadas.
- Documentar el propósito de cada migración.

======================================================================
SEEDS
======================================================================

Los datos iniciales deberán mantenerse separados de la estructura.

Como mínimo podrán existir seeds para:

- Roles.
- Usuario administrador inicial (si el proyecto lo requiere).
- Parámetros básicos del sistema.

No incluir datos de prueba innecesarios.

======================================================================
DOCUMENTACIÓN
======================================================================

Toda decisión relacionada con la base de datos deberá documentarse.

Como mínimo deberá existir documentación sobre:

- Modelo relacional.
- Convenciones de nombres.
- Relaciones entre tablas.
- Estrategia de claves.
- Estrategia de índices.
- Estrategia de migraciones.
- Estrategia de respaldo.

======================================================================
ENTREGABLES
======================================================================

Si durante esta fase realizas modificaciones relacionadas con la base de datos deberás informar:

- Archivos SQL creados.
- Archivos SQL modificados.
- Nuevas tablas.
- Tablas reutilizadas.
- Relaciones agregadas.
- Restricciones agregadas.
- Índices agregados.
- Justificación técnica de cada cambio.

Toda modificación deberá respetar el alcance del MVP y la arquitectura definida para el proyecto.