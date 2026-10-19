const ApiResponse = require('../responses/api-response');
const status = require('../../constants/http-status');

class BaseController {
  success(res, data, message = '') { return res.status(status.OK).json(ApiResponse.success(message, data)); }
  created(res, data, message) { return res.status(status.CREATED).json(ApiResponse.success(message, data)); }
  error(res, statusCode, message, errors = []) { return res.status(statusCode).json(ApiResponse.failure(message, errors)); }
}
module.exports = BaseController;
