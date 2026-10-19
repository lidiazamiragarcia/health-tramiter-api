"use strict";
const AppError = require('../core/exceptions/app-error');
const status = require('../constants/http-status');

// requiredRole can be a string or an array of allowed role names
module.exports = (requiredRole) => (req, res, next) => {
  const user = req.user;
  if (!user) return next(new AppError(status.BAD_REQUEST, 'Usuario no autenticado'));
  const role = String(user.role || '').toUpperCase();
  const required = Array.isArray(requiredRole)
    ? requiredRole.map((r) => String(r).toUpperCase())
    : [String(requiredRole).toUpperCase()];
  if (!required.includes(role)) return next(new AppError(status.FORBIDDEN || 403, 'Acceso denegado'));
  next();
};

