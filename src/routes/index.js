const router = require('express').Router(); const paths = require('../constants/routes'); const ApiResponse = require('../core/responses/api-response');
router.get('/health', (req, res) => res.json(ApiResponse.success('Servicio disponible', { status: 'ok' })));
router.use(paths.AUTH, require('../modules/auth')); router.use(paths.USERS, require('../modules/usuarios')); router.use(paths.ROLES, require('../modules/roles')); router.use(paths.IDENTIFICATION_TYPES, require('../modules/tipos-identificacion')); router.use(paths.TRAMITES, require('../modules/tramites')); module.exports = router;
