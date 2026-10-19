const BaseController = require('../../core/controllers/base-controller');
const service = require('./auth.service');
const asyncHandler = require('../../middlewares/async-handler');
const messages = require('../../constants/messages');

class AuthController extends BaseController {
  login = asyncHandler(async (req, res) => {
    const result = await service.login(req.body);
    // Set refresh token cookie
    const { jwt } = require('../../config/env');
    const { signToken } = require('../../utils/jwt');
    const tokenPayload = { id: result.user.id, email: result.user.email, role: result.user.role || null };
    const refresh = signToken(tokenPayload, jwt.refreshExpiresIn);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: jwt.refreshExpiresIn * 1000,
      path: '/api/v1'
    };
    res.cookie('refreshToken', refresh, cookieOptions);
    return this.success(res, result, 'Inicio de sesión correcto');
  });

  register = asyncHandler(async (req, res) => this.created(res, await service.register(req.body), messages.CREATED));

  requestPasswordReset = asyncHandler(async (req, res) => this.success(res, await service.requestPasswordReset(req.body), 'Token generado'));

  resetPassword = asyncHandler(async (req, res) => this.success(res, await service.resetPassword(req.body), 'Contraseña actualizada'));
  logout = asyncHandler(async (req, res) => {
    // Clear refresh cookie
    const { jwt } = require('../../config/env');
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/api/v1'
    };
    const token = req.cookies && req.cookies.refreshToken;
    if (token) {
      await service.logout(token);
    }
    res.clearCookie('refreshToken', cookieOptions);
    return this.success(res, { success: true }, 'Cierre de sesión correcto');
  });

  refresh = asyncHandler(async (req, res) => {
    const token = req.cookies && req.cookies.refreshToken;
    if (!token) return this.error(res, 401, 'Refresh token no proporcionado');
    const result = await service.refresh(token);
    // set new refresh cookie
    const { jwt } = require('../../config/env');
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: jwt.refreshExpiresIn * 1000,
      path: '/api/v1'
    };
    res.cookie('refreshToken', result.refreshToken, cookieOptions);
    return this.success(res, { accessToken: result.accessToken }, 'Token renovado');
  });
}

module.exports = new AuthController();
