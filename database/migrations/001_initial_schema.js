const fs = require('fs');
const path = require('path');

exports.up = async function (knex) {
  const sqlPath = path.join(__dirname, '..', 'schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  // Ejecutar script SQL completo (es el schema canonical del proyecto)
  return knex.raw(sql);
};

exports.down = async function (knex) {
  // Intento seguro de revertir: eliminar vista y tablas creadas por el schema.
  await knex.raw('DROP VIEW IF EXISTS user_dashboard_stats');
  await knex.schema.dropTableIfExists('user_preferences');
  await knex.schema.dropTableIfExists('audit_logs');
  await knex.schema.dropTableIfExists('user_sessions');
  await knex.schema.dropTableIfExists('password_reset_tokens');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('identification_types');
  await knex.schema.dropTableIfExists('roles');
};

