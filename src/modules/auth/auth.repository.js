const queries = require('./auth.query'); class AuthRepository { findByEmail(email) { return queries.findByEmail(email); } } module.exports = new AuthRepository();
