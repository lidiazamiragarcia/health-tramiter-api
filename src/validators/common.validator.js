const { param, body } = require('express-validator');
const regex = require('../constants/regex');
const security = require('../constants/security');
exports.validateId = () => param('id').isInt({ min: 1 }).toInt().withMessage('El id debe ser un entero positivo');
exports.validateEmail = () => body('email').trim().matches(regex.EMAIL).withMessage('El correo no es válido').normalizeEmail();
exports.validatePassword = () => body('password').isLength({ min: security.MIN_PASSWORD_LENGTH, max: security.MAX_PASSWORD_LENGTH }).withMessage(`La contraseña debe tener entre ${security.MIN_PASSWORD_LENGTH} y ${security.MAX_PASSWORD_LENGTH} caracteres`);
exports.validatePhone = () => body('phone').optional().trim().matches(regex.PHONE).withMessage('El teléfono no es válido');
