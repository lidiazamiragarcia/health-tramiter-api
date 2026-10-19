const { body, query } = require('express-validator');
const validationHandler = require('../../middlewares/validation-handler');
const { validateId } = require('../../validators/common.validator');

const statuses = ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO', 'RECHAZADO'];

exports.listAvailable = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('pageSize').optional().isInt({ min: 1, max: 50 }).toInt(),
  validationHandler,
];

exports.create = [
  body('type').trim().notEmpty().withMessage('El tipo de trámite es obligatorio'),
  body('description').optional().trim(),
  body('status').optional().isIn(statuses),
  body('userId').optional().isInt({ min: 1 }).toInt(),
  validationHandler,
];

exports.update = [
  validateId(),
  body('type').optional().trim().notEmpty(),
  body('description').optional().trim(),
  body('status').optional().isIn(statuses),
  validationHandler,
];

exports.byId = [validateId(), validationHandler];
