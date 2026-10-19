const app = require('./app'); const { port } = require('./config/env'); app.listen(port, () => console.log(`Health Tramiter API ejecutándose en el puerto ${port}`));
