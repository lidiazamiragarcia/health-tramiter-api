const router = require('express').Router();
const controller = require('./rol.controller');
const validator = require('./rol.validator');
const authMiddleware = require('../../middlewares/auth.middleware');
const requireRole = require('../../middlewares/role.middleware');

// Todas las rutas de roles requieren autenticación y rol ADMIN
router.use(authMiddleware, requireRole('ADMIN'));

router.get('/', controller.getAll);
router.get('/:id', validator.byId, controller.getById);
router.post('/', validator.create, controller.create);
router.put('/:id', validator.update, controller.update);
router.delete('/:id', validator.byId, controller.delete);

module.exports = router;
