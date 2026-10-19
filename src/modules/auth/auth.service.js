const AppError = require('../../core/exceptions/app-error');
const status = require('../../constants/http-status');
const messages = require('../../constants/messages');
const { comparePassword } = require('../../utils/password');
const repository = require('./auth.repository');
const { signToken } = require('../../utils/jwt');
const crypto = require('crypto');
const db = require('../../config/database');
const { hashPassword } = require('../../utils/password');
const usuarioService = require('../usuarios/usuario.service');
const usuarioRepository = require('../usuarios/usuario.repository');

class AuthService {
  async login({ email, password }) {
    const user = await repository.findByEmail(email);
    if (!user || !(await comparePassword(password, user.passwordHash)))
      throw new AppError(status.BAD_REQUEST, messages.INVALID_CREDENTIALS);

    // Construir DTO de usuario sin exponer el hash
    const userDto = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.roleName || null
    };

    // Firmar token JWT incluyendo rol (si existe)
    const tokenPayload = { id: user.id, email: user.email, role: user.roleName || null };
    const accessToken = signToken(tokenPayload);
    const refreshToken = signToken(tokenPayload, require('../../config/env').jwt.refreshExpiresIn);
    // Persist refresh token in user_sessions for revocation and tracking
    const expiresAt = new Date(Date.now() + require('../../config/env').jwt.refreshExpiresIn * 1000);
    const expiresAtSql = expiresAt.toISOString().slice(0, 19).replace('T', ' ');
    await db.query('INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)', [user.id, refreshToken, expiresAtSql]);

    return { user: userDto, accessToken };
  }

  async register(userData) {
    // Delegate to usuarioService (handles uniqueness and hashing)
    const created = await usuarioService.create(userData);
    // Remove sensitive fields
    const { passwordHash, ...userDto } = created;
    return userDto;
  }

  async requestPasswordReset({ email }) {
    const user = await repository.findByEmail(email);
    if (!user) throw new AppError(status.NOT_FOUND, messages.NOT_FOUND);
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const expiresAtSql = expiresAt.toISOString().slice(0, 19).replace('T', ' ');
    await db.query('INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)', [user.id, token, expiresAtSql]);
    // In production, send email with token. For MVP, return token so frontend can simulate.
    return { token, expiresAt: expiresAtSql };
  }

  async resetPassword({ token, password }) {
    const [rows] = await db.query('SELECT * FROM password_reset_tokens WHERE token = ? AND expires_at > NOW()', [token]);
    const row = rows[0];
    if (!row) throw new AppError(status.BAD_REQUEST, 'Token inválido o expirado');
    const passwordHash = await hashPassword(password);
    await usuarioRepository.setPassword(row.user_id, passwordHash);
    await db.query('DELETE FROM password_reset_tokens WHERE id = ?', [row.id]);
    return { success: true };
  }

  async logout() {
    // For backward compatibility: if called without token, noop.
    return { success: true };
  }

  async refresh(refreshToken) {
    const { verifyToken, signToken } = require('../../utils/jwt');
    const payload = verifyToken(refreshToken);
    if (!payload) throw new AppError(status.UNAUTHORIZED, 'Refresh token inválido');
    // Optionally validate user still exists
    const user = await usuarioRepository.findById(payload.id);
    if (!user) throw new AppError(status.NOT_FOUND, messages.NOT_FOUND);
    // Verify refresh token exists in DB and is not expired
    const [rows] = await db.query('SELECT id, expires_at FROM user_sessions WHERE user_id = ? AND session_token = ? LIMIT 1', [user.id, refreshToken]);
    const session = rows[0];
    if (!session) throw new AppError(status.UNAUTHORIZED, 'Refresh token no válido o no encontrado');
    // Check expiration in DB (additional safety)
    const now = new Date();
    if (new Date(session.expires_at) < now) {
      await db.query('DELETE FROM user_sessions WHERE id = ?', [session.id]);
      throw new AppError(status.UNAUTHORIZED, 'Refresh token expirado');
    }
    const tokenPayload = { id: user.id, email: user.email, role: user.roleName || null };
    const accessToken = signToken(tokenPayload);
    const newRefresh = signToken(tokenPayload, require('../../config/env').jwt.refreshExpiresIn);
    const expiresAt = new Date(Date.now() + require('../../config/env').jwt.refreshExpiresIn * 1000);
    const expiresAtSql = expiresAt.toISOString().slice(0, 19).replace('T', ' ');
    // Rotate session token in DB
    await db.query('UPDATE user_sessions SET session_token = ?, expires_at = ? WHERE id = ?', [newRefresh, expiresAtSql, session.id]);
    return { accessToken, refreshToken: newRefresh };
  }

  async logout(refreshToken) {
    if (!refreshToken) return { success: true };
    await db.query('DELETE FROM user_sessions WHERE session_token = ?', [refreshToken]);
    return { success: true };
  }
}

module.exports = new AuthService();
