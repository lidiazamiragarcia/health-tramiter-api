require('dotenv').config();
const { db } = require('./src/config/env');

module.exports = {
  development: {
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
    migrations: {
      directory: './database/migrations'
    }
  },
  // production configuration can be added later
};

