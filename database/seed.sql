-- health-tramiter-api/database/seed.sql
-- Datos iniciales del sistema Health Tramiter
-- Ejecutar después de schema.sql: mysql -u root -p < database/seed.sql
--
-- Usuarios por defecto:
--   ADMIN      → z.ami98@hotmail.com              / Admin123!
--   USER       → usuario@health-tramiter.local    / User123!
--   TRAMITADOR → tramitador@health-tramiter.local / Tramitador123!

USE health_tramiter;

-- ---------------------------------------------------------------------------
-- Roles del sistema
-- ---------------------------------------------------------------------------

INSERT INTO roles (name, description) VALUES
  ('ADMIN', 'Administrador del sistema'),
  ('USER', 'Usuario estándar'),
  ('TRAMITADOR', 'Tramitador de solicitudes')
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- ---------------------------------------------------------------------------
-- Tipos de identificación
-- ---------------------------------------------------------------------------

INSERT INTO identification_types (code, name) VALUES
  ('CC', 'Cédula de ciudadanía'),
  ('CE', 'Cédula de extranjería'),
  ('PA', 'Pasaporte'),
  ('TI', 'Tarjeta de identidad')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- ---------------------------------------------------------------------------
-- Usuario ADMIN (password: Admin123!)
-- ---------------------------------------------------------------------------

INSERT INTO users (
  first_name,
  last_name,
  email,
  password_hash,
  identification_type_id,
  identification_number,
  role_id,
  is_active
)
VALUES (
  'Admin',
  'Sistema',
  'z.ami98@hotmail.com',
  '$2b$10$S41g9d3L/yovsPbNlw9s7O5ZhdXQ/GJUBS1RGbwjOeZScyALocObS',
  (SELECT id FROM identification_types WHERE code = 'CC' LIMIT 1),
  '1049603362',
  (SELECT id FROM roles WHERE name = 'ADMIN' LIMIT 1),
  TRUE
)
ON DUPLICATE KEY UPDATE
  first_name = VALUES(first_name),
  last_name = VALUES(last_name),
  password_hash = VALUES(password_hash),
  role_id = VALUES(role_id),
  is_active = VALUES(is_active);

-- ---------------------------------------------------------------------------
-- Usuario USER normal (password: User123!)
-- ---------------------------------------------------------------------------

INSERT INTO users (
  first_name,
  last_name,
  email,
  password_hash,
  identification_type_id,
  identification_number,
  role_id,
  is_active
)
VALUES (
  'María',
  'Usuario',
  'usuario@health-tramiter.local',
  '$2b$10$x1gh79yIbonnpYgquIiXmeuqty.HOqQWCUzUH2fThZF5HQrUfS56q',
  (SELECT id FROM identification_types WHERE code = 'CC' LIMIT 1),
  '1000000002',
  (SELECT id FROM roles WHERE name = 'USER' LIMIT 1),
  TRUE
)
ON DUPLICATE KEY UPDATE
  first_name = VALUES(first_name),
  last_name = VALUES(last_name),
  password_hash = VALUES(password_hash),
  role_id = VALUES(role_id),
  is_active = VALUES(is_active);

-- ---------------------------------------------------------------------------
-- Usuario TRAMITADOR (password: Tramitador123!)
-- ---------------------------------------------------------------------------

INSERT INTO users (
  first_name,
  last_name,
  email,
  password_hash,
  identification_type_id,
  identification_number,
  role_id,
  is_active
)
VALUES (
  'Carlos',
  'Tramitador',
  'tramitador@health-tramiter.local',
  '$2b$10$zMJVmgZPJiWcyj9LDRgPwOJapxh4bw4BYBcJEMqiEWcUkEuhW1V8m',
  (SELECT id FROM identification_types WHERE code = 'CC' LIMIT 1),
  '1000000001',
  (SELECT id FROM roles WHERE name = 'TRAMITADOR' LIMIT 1),
  TRUE
)
ON DUPLICATE KEY UPDATE
  first_name = VALUES(first_name),
  last_name = VALUES(last_name),
  password_hash = VALUES(password_hash),
  role_id = VALUES(role_id),
  is_active = VALUES(is_active);

-- ---------------------------------------------------------------------------
-- Trámite de ejemplo (disponible para que un tramitador lo tome)
-- ---------------------------------------------------------------------------

INSERT INTO tramites (user_id, type, description, status)
SELECT u.id, 'Registro EPS', 'Solicitud de afiliación', 'PENDIENTE'
FROM users u
WHERE u.email = 'usuario@health-tramiter.local'
  AND NOT EXISTS (
    SELECT 1 FROM tramites tr WHERE tr.user_id = u.id LIMIT 1
  );
