const db = require('../../config/database');
const fields = 'id, name, description, created_at, updated_at';
exports.findAll = async () => (await db.query(`SELECT ${fields} FROM roles ORDER BY name`))[0];
exports.findById = async (id) => (await db.query(`SELECT ${fields} FROM roles WHERE id = ?`, [id]))[0][0];
exports.exists = async (name) => (await db.query('SELECT id FROM roles WHERE name = ?', [name]))[0][0];
exports.create = async ({ name, description }) => { const [r] = await db.query('INSERT INTO roles (name, description) VALUES (?, ?)', [name, description || null]); return exports.findById(r.insertId); };
exports.update = async (id, { name, description }) => { await db.query('UPDATE roles SET name = ?, description = ? WHERE id = ?', [name, description || null, id]); return exports.findById(id); };
exports.delete = async (id) => { await db.query('DELETE FROM roles WHERE id = ?', [id]); };
