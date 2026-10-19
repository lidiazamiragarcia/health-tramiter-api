const BaseService = require('../../core/services/base-service');
const AppError = require('../../core/exceptions/app-error');
const status = require('../../constants/http-status');
const repository = require('./rol.repository');
class RolService extends BaseService {
  constructor() { super(repository, 'Rol'); }
  async create(data) { if (await this.repository.exists(data.name)) throw new AppError(status.CONFLICT, 'Ya existe un rol con ese nombre'); return super.create(data); }
  async update(id, data) { const current = await this.getById(id); const duplicate = await this.repository.exists(data.name); if (duplicate && duplicate.id !== id) throw new AppError(status.CONFLICT, 'Ya existe un rol con ese nombre'); return this.repository.update(id, { ...current, ...data }); }
}
module.exports = new RolService();
