require('dotenv').config();

const required = ['DB_HOST', 'DB_DATABASE', 'DB_USER', 'JWT_SECRET'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) throw new Error(`Faltan variables de entorno: ${missing.join(', ')}`);

module.exports = Object.freeze({
  port: Number(process.env.PORT || 3000),
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || ''
  },
  saltRounds: Number(process.env.SALT_ROUNDS || 12),
  jwt: {
    secret: process.env.JWT_SECRET,
    // jwtExpires in seconds (default 3600 = 1h)
    expiresIn: Number(process.env.JWT_EXPIRES || 3600),
    refreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRES || 604800) // 7 days
  }
});
