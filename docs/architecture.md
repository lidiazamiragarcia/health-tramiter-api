# Arquitectura

El flujo de cada solicitud es: Routes → Validators → Validation Handler → Controllers → Services → Repositories → MySQL.

Los controladores solo adaptan HTTP; los servicios aplican las reglas de correo, documento y nombres únicos; y los repositorios delegan el acceso a datos hacia archivos `*.query.js`.
