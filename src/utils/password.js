const bcrypt = require('bcrypt');
const { saltRounds } = require('../config/env');
exports.hashPassword = (password) => bcrypt.hash(password, saltRounds);
exports.comparePassword = (password, hash) => bcrypt.compare(password, hash);
