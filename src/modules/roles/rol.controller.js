const BaseController = require('../../core/controllers/base-controller'); const service = require('./rol.service'); const asyncHandler = require('../../middlewares/async-handler'); const messages = require('../../constants/messages');
class RolController extends BaseController {
  getAll = asyncHandler(async (req, res) => this.success(res, await service.getAll()));
  getById = asyncHandler(async (req, res) => this.success(res, await service.getById(req.params.id)));
  create = asyncHandler(async (req, res) => this.created(res, await service.create(req.body), messages.CREATED));
  update = asyncHandler(async (req, res) => this.success(res, await service.update(req.params.id, req.body), messages.UPDATED));
  delete = asyncHandler(async (req, res) => { await service.delete(req.params.id); res.status(204).send(); });
} module.exports = new RolController();
