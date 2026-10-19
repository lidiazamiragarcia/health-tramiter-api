const db = require('../../config/database');

// Ahora se incluye la información del rol (role id y role name) para que el JWT pueda contener roles.
exports.findByEmail = async (email) =>
  (await db.query(
    `SELECT u.id, u.first_name AS firstName, u.last_name AS lastName, u.email, u.password_hash AS passwordHash,
            r.id AS roleId, r.name AS roleName
     FROM users u
     LEFT JOIN roles r ON u.role_id = r.id
     WHERE u.email = ?`,
    [email]
  ))[0][0];
