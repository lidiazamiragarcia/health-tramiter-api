const ApiResponse = require('../core/responses/api-response');
const status = require('../constants/http-status');
const messages = require('../constants/messages');
module.exports = (req, res) => res.status(status.NOT_FOUND).json(ApiResponse.failure(messages.NOT_FOUND));
