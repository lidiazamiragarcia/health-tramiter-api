"use strict";
const AppError = require('../core/exceptions/app-error');
const status = require('../constants/http-status');
const messages = require('../constants/messages');
const { verifyToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) return next(new AppError(status.UNAUTHORIZED || 401, 'Token no proporcionado'));
    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload) return next(new AppError(status.UNAUTHORIZED || 401, 'Token inválido o expirado'));
    req.user = payload;
    next();
  } catch (err) {
    next(new AppError(status.UNAUTHORIZED || 401, 'Error validando token'));
  }
};

