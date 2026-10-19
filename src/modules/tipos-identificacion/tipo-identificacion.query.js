const db = require('../../config/database'); const fields = 'id, code, name, created_at, updated_at';
exports.findAll = async () => (await db.query(`SELECT ${fields} FROM identification_types ORDER BY name`))[0];
exports.findById = async (id) => (await db.query(`SELECT ${fields} FROM identification_types WHERE id = ?`, [id]))[0][0];
exports.exists = async (name) => (await db.query('SELECT id FROM identification_types WHERE name = ?', [name]))[0][0];
exports.create = async ({ code, name }) => { const [r] = await db.query('INSERT INTO identification_types (code, name) VALUES (?, ?)', [code, name]); return exports.findById(r.insertId); };
exports.update = async (id, { code, name }) => { await db.query('UPDATE identification_types SET code = ?, name = ? WHERE id = ?', [code, name, id]); return exports.findById(id); };
exports.delete = async (id) => { await db.query('DELETE FROM identification_types WHERE id = ?', [id]); };
