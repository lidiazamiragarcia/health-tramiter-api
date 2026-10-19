const AppError = require('../exceptions/app-error');
const status = require('../../constants/http-status');
const messages = require('../../constants/messages');

class BaseService {
  constructor(repository, resourceName) { this.repository = repository; this.resourceName = resourceName; }
  getAll() { return this.repository.findAll(); }
  async getById(id) { const item = await this.repository.findById(id); if (!item) throw new AppError(status.NOT_FOUND, `${this.resourceName} no encontrado`); return item; }
  create(data) { return this.repository.create(data); }
  async update(id, data) { await this.getById(id); return this.repository.update(id, data); }
  async delete(id) { await this.getById(id); return this.repository.delete(id); }
}
module.exports = BaseService;
