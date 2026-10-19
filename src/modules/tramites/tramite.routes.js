const router = require('express').Router();
const controller = require('./tramite.controller');
const validator = require('./tramite.validator');
const authMiddleware = require('../../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/disponibles', validator.listAvailable, controller.getAvailable);
router.get('/asignados', controller.getAssigned);
router.get('/', controller.getAll);
router.get('/:id', validator.byId, controller.getById);
router.post('/', validator.create, controller.create);
router.post('/:id/tomar', validator.byId, controller.take);
router.put('/:id', validator.update, controller.update);
router.delete('/:id', validator.byId, controller.delete);

module.exports = router;
