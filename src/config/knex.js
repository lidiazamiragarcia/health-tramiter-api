const knex = require('knex');
const { db } = require('./env');

const instance = knex({
  client: 'mysql2',
  connection: {
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    multipleStatements: true,
    database: db.database,
    charset: 'utf8mb4'
  },
  pool: { min: 0, max: 10 }
});

module.exports = instance;

