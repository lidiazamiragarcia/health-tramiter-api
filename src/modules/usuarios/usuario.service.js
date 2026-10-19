const BaseService = require('../../core/services/base-service'); const AppError = require('../../core/exceptions/app-error'); const status = require('../../constants/http-status'); const { hashPassword } = require('../../utils/password'); const repository = require('./usuario.repository');
class UsuarioService extends BaseService {
  constructor() { super(repository, 'Usuario'); }
  // El correo y el documento identifican de forma única a una persona en el MVP.
  async assertUnique(data, id) { const email = await this.repository.exists(data.email); if (email && email.id !== id) throw new AppError(status.CONFLICT, 'El correo ya está registrado'); const document = await this.repository.findByDocument(data.identificationTypeId, data.identificationNumber); if (document && document.id !== id) throw new AppError(status.CONFLICT, 'El documento ya está registrado'); }
  async create(data) { await this.assertUnique(data); return this.repository.create({ ...data, passwordHash: await hashPassword(data.password) }); }
  async update(id, data) { const current = await this.getById(id); await this.assertUnique(data, id); return this.repository.update(id, { ...current, ...data }); }
} module.exports = new UsuarioService();
