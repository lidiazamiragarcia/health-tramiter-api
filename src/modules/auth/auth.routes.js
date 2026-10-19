const router = require('express').Router();
const controller = require('./auth.controller');
const { login, register, forgotPassword, resetPassword } = require('./auth.validator');

router.post('/login', login, controller.login);
router.post('/register', register, controller.register);
router.post('/forgot-password', forgotPassword, controller.requestPasswordReset);
router.post('/reset-password', resetPassword, controller.resetPassword);
router.post('/logout', controller.logout);
router.post('/refresh', controller.refresh);

module.exports = router;
