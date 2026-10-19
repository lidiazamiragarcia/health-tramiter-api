const ApiResponse = require('../core/responses/api-response');
const status = require('../constants/http-status');
const messages = require('../constants/messages');

module.exports = (error, req, res, next) => {
  const conflictErrors = ['ER_DUP_ENTRY', 'ER_ROW_IS_REFERENCED_2'];
  const statusCode = error.statusCode || (conflictErrors.includes(error.code) ? status.CONFLICT : status.INTERNAL_SERVER_ERROR);
  if (statusCode === status.INTERNAL_SERVER_ERROR) console.error(error);
  res.status(statusCode).json(ApiResponse.failure(error.message || messages.INTERNAL_ERROR, error.errors || []));
};
