const { validationResult } = require('express-validator');
const AppError = require('../core/exceptions/app-error');
const status = require('../constants/http-status');
const messages = require('../constants/messages');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new AppError(status.UNPROCESSABLE_ENTITY, messages.VALIDATION_ERROR, errors.array()));
  next();
};
