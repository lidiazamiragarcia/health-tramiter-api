const BaseController = require('../../core/controllers/base-controller');
const service = require('./tramite.service');
const asyncHandler = require('../../middlewares/async-handler');
const messages = require('../../constants/messages');

class TramiteController extends BaseController {
  getAll = asyncHandler(async (req, res) =>
    this.success(res, await service.listForUser(req.user))
  );

  getAvailable = asyncHandler(async (req, res) =>
    this.success(res, await service.listAvailable(req.user, req.query))
  );

  getAssigned = asyncHandler(async (req, res) =>
    this.success(res, await service.listAssigned(req.user))
  );

  getById = asyncHandler(async (req, res) =>
    this.success(res, await service.getById(req.params.id, req.user))
  );

  create = asyncHandler(async (req, res) =>
    this.created(res, await service.create(req.body, req.user), messages.CREATED)
  );

  take = asyncHandler(async (req, res) =>
    this.success(res, await service.take(req.params.id, req.user), 'Trámite asignado correctamente')
  );

  update = asyncHandler(async (req, res) =>
    this.success(res, await service.update(req.params.id, req.body, req.user), messages.UPDATED)
  );

  delete = asyncHandler(async (req, res) => {
    await service.delete(req.params.id, req.user);
    res.status(204).send();
  });
}

module.exports = new TramiteController();
