const { body } = require('express-validator'); const validationHandler = require('../../middlewares/validation-handler'); const { validateId } = require('../../validators/common.validator');
exports.create = [body('name').trim().notEmpty().withMessage('El nombre es obligatorio'), body('description').optional().trim().isLength({ max: 255 }), validationHandler];
exports.update = [validateId(), ...exports.create]; exports.byId = [validateId(), validationHandler];
