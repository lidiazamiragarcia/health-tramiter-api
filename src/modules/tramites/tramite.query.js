const db = require('../../config/database');

const projection = `t.id, t.user_id AS userId, t.assigned_tramitador_id AS assignedTramitadorId,
  t.type, t.description, t.status, t.assigned_at AS assignedAt,
  t.created_at AS createdAt, t.updated_at AS updatedAt,
  u.first_name AS requesterFirstName, u.last_name AS requesterLastName, u.email AS requesterEmail,
  ta.first_name AS assigneeFirstName, ta.last_name AS assigneeLastName, ta.email AS assigneeEmail`;

const joins = ` FROM tramites t
  INNER JOIN users u ON u.id = t.user_id
  LEFT JOIN users ta ON ta.id = t.assigned_tramitador_id`;

const availableWhere = 't.assigned_tramitador_id IS NULL AND t.status = ?';

exports.findAll = async () =>
  (await db.query(`SELECT ${projection}${joins} ORDER BY t.created_at DESC`))[0];

exports.findByUserId = async (userId) =>
  (await db.query(`SELECT ${projection}${joins} WHERE t.user_id = ? ORDER BY t.created_at DESC`, [userId]))[0];

exports.countAvailable = async () => {
  const [rows] = await db.query(
    `SELECT COUNT(*) AS total${joins} WHERE ${availableWhere}`,
    ['PENDIENTE']
  );
  return Number(rows[0]?.total || 0);
};

exports.findAvailable = async ({ pageSize = 10, offset = 0 } = {}) =>
  (await db.query(
    `SELECT ${projection}${joins}
     WHERE ${availableWhere}
     ORDER BY t.created_at ASC
     LIMIT ? OFFSET ?`,
    ['PENDIENTE', pageSize, offset]
  ))[0];

exports.findByAssignedTramitador = async (tramitadorId) =>
  (await db.query(
    `SELECT ${projection}${joins}
     WHERE t.assigned_tramitador_id = ?
     ORDER BY t.created_at DESC`,
    [tramitadorId]
  ))[0];

exports.findById = async (id) =>
  (await db.query(`SELECT ${projection}${joins} WHERE t.id = ?`, [id]))[0][0];

exports.create = async ({ userId, type, description, status }) => {
  const [r] = await db.query(
    'INSERT INTO tramites (user_id, type, description, status) VALUES (?, ?, ?, ?)',
    [userId, type, description || null, status || 'PENDIENTE']
  );
  return exports.findById(r.insertId);
};

exports.assignToTramitador = async (id, tramitadorId) => {
  const [result] = await db.query(
    `UPDATE tramites
     SET assigned_tramitador_id = ?, assigned_at = CURRENT_TIMESTAMP, status = 'EN_PROCESO'
     WHERE id = ? AND assigned_tramitador_id IS NULL AND status = 'PENDIENTE'`,
    [tramitadorId, id]
  );
  if (!result.affectedRows) return null;
  return exports.findById(id);
};

exports.update = async (id, { type, description, status }) => {
  await db.query(
    'UPDATE tramites SET type = ?, description = ?, status = ? WHERE id = ?',
    [type, description || null, status, id]
  );
  return exports.findById(id);
};

exports.delete = async (id) => {
  await db.query('DELETE FROM tramites WHERE id = ?', [id]);
};
