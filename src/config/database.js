const mysql = require('mysql2/promise');
const { db } = require('./env');

module.exports = mysql.createPool({ ...db, waitForConnections: true, connectionLimit: 10, queueLimit: 0 });
