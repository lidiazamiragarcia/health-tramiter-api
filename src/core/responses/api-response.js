class ApiResponse {
  static success(message = '', data = {}) { return { success: true, message, data, errors: null }; }
  static failure(message, errors = []) { return { success: false, message, data: null, errors }; }
}
module.exports = ApiResponse;
