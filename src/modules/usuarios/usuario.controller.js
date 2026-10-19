const BaseController = require('../../core/controllers/base-controller');
const service = require('./usuario.service');
const asyncHandler = require('../../middlewares/async-handler');
const messages = require('../../constants/messages');

class UsuarioController extends BaseController {
  getAll = asyncHandler(async (q, r) => this.success(r, await service.getAll()));
  getById = asyncHandler(async (q, r) => this.success(r, await service.getById(q.params.id)));
  create = asyncHandler(async (q, r) => this.created(r, await service.create(q.body), messages.CREATED));
  update = asyncHandler(async (q, r) => this.success(r, await service.update(q.params.id, q.body), messages.UPDATED));
  delete = asyncHandler(async (q, r) => { await service.delete(q.params.id); r.status(204).send(); });

  // GET /usuarios/me
  getMe = asyncHandler(async (req, res) => {
    const userId = req.user && req.user.id;
    return this.success(res, await service.getById(userId));
  });
}

module.exports = new UsuarioController();
