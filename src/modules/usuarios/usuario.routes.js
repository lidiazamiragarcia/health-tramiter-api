const router = require('express').Router();
const controller = require('./usuario.controller');
const validator = require('./usuario.validator');
const authMiddleware = require('../../middlewares/auth.middleware');
const requireRole = require('../../middlewares/role.middleware');

// Public endpoint: crear usuario (registro)
router.post('/', validator.create, controller.create);

// Authenticated "me" endpoint for current user (no admin required)
router.get('/me', authMiddleware, controller.getMe);

// Protect remaining routes: requiere autenticación y rol ADMIN
router.use(authMiddleware, requireRole('ADMIN'));

router.get('/', controller.getAll);
router.get('/:id', validator.byId, controller.getById);
router.put('/:id', validator.update, controller.update);
router.delete('/:id', validator.byId, controller.delete);

module.exports = router;
