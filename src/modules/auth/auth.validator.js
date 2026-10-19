const { body } = require('express-validator');
const validationHandler = require('../../middlewares/validation-handler');
const { validateEmail, validatePassword } = require('../../validators/common.validator');

exports.login = [validateEmail(), validatePassword(), validationHandler];

exports.register = [
  body('firstName').notEmpty().withMessage('firstName is required'),
  body('lastName').notEmpty().withMessage('lastName is required'),
  validateEmail(),
  validatePassword(),
  body('identificationTypeId').isInt().withMessage('identificationTypeId is required'),
  body('identificationNumber').notEmpty().withMessage('identificationNumber is required'),
  body('roleId').isInt().withMessage('roleId is required'),
  validationHandler
];

exports.forgotPassword = [validateEmail(), validationHandler];
exports.resetPassword = [body('token').notEmpty(), body('password').isLength({ min: 6 }), validationHandler];
