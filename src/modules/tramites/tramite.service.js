const AppError = require('../../core/exceptions/app-error');
const status = require('../../constants/http-status');
const repository = require('./tramite.repository');
const { parsePagination, buildPaginatedResult } = require('../../utils/pagination');

function normalizeRole(role) {
  return String(role || '').toUpperCase();
}

function isAdmin(role) {
  return normalizeRole(role) === 'ADMIN';
}

function isTramitador(role) {
  return normalizeRole(role) === 'TRAMITADOR';
}

function isAssignedTo(tramite, userId) {
  return Number(tramite.assignedTramitadorId) === Number(userId);
}

class TramiteService {
  listForUser(user) {
    if (isAdmin(user.role)) return repository.findAll();
    if (isTramitador(user.role)) return repository.findByAssignedTramitador(user.id);
    return repository.findByUserId(user.id);
  }

  async listAvailable(user, query = {}) {
    if (!isTramitador(user.role)) {
      throw new AppError(status.FORBIDDEN, 'Solo los tramitadores pueden ver trámites disponibles');
    }
    const { page, pageSize, offset } = parsePagination(query);
    const [items, total] = await Promise.all([
      repository.findAvailable({ pageSize, offset }),
      repository.countAvailable(),
    ]);
    return buildPaginatedResult(items, total, page, pageSize);
  }

  listAssigned(user) {
    if (!isTramitador(user.role)) {
      throw new AppError(status.FORBIDDEN, 'Solo los tramitadores pueden ver sus trámites asignados');
    }
    return repository.findByAssignedTramitador(user.id);
  }

  async assertAccess(tramite, user) {
    if (isAdmin(user.role)) return;
    if (Number(tramite.userId) === Number(user.id)) return;
    if (isTramitador(user.role) && isAssignedTo(tramite, user.id)) return;
    throw new AppError(status.FORBIDDEN, 'No tienes permiso para acceder a este trámite');
  }

  async getById(id, user) {
    const item = await repository.findById(id);
    if (!item) throw new AppError(status.NOT_FOUND, 'Trámite no encontrado');
    await this.assertAccess(item, user);
    return item;
  }

  create(data, user) {
    const userId = isAdmin(user.role) && data.userId ? data.userId : user.id;
    if (!isAdmin(user.role) && data.userId && Number(data.userId) !== Number(user.id)) {
      throw new AppError(status.FORBIDDEN, 'No puedes crear trámites para otro usuario');
    }
    return repository.create({
      userId,
      type: data.type,
      description: data.description,
      status: isAdmin(user.role) ? (data.status || 'PENDIENTE') : 'PENDIENTE',
    });
  }

  async take(id, user) {
    if (!isTramitador(user.role)) {
      throw new AppError(status.FORBIDDEN, 'Solo los tramitadores pueden tomar trámites');
    }

    const current = await repository.findById(id);
    if (!current) throw new AppError(status.NOT_FOUND, 'Trámite no encontrado');
    if (current.assignedTramitadorId) {
      throw new AppError(status.CONFLICT, 'Este trámite ya fue tomado por otro tramitador');
    }
    if (current.status !== 'PENDIENTE') {
      throw new AppError(status.CONFLICT, 'Este trámite ya fue iniciado y no está disponible');
    }

    const assigned = await repository.assignToTramitador(id, user.id);
    if (!assigned) {
      throw new AppError(status.CONFLICT, 'Este trámite ya fue tomado por otro tramitador');
    }
    return assigned;
  }

  async update(id, data, user) {
    const current = await this.getById(id, user);
    const isOwner = Number(current.userId) === Number(user.id);
    const isAssignee = isTramitador(user.role) && isAssignedTo(current, user.id);

    if (isOwner && !isAdmin(user.role) && !isTramitador(user.role)) {
      return repository.update(id, {
        type: data.type ?? current.type,
        description: data.description ?? current.description,
        status: current.status,
      });
    }

    if (isTramitador(user.role) && !isAssignee) {
      throw new AppError(status.FORBIDDEN, 'Solo puedes gestionar trámites que hayas tomado');
    }

    return repository.update(id, {
      type: data.type ?? current.type,
      description: data.description ?? current.description,
      status: data.status ?? current.status,
    });
  }

  async delete(id, user) {
    if (!isAdmin(user.role)) {
      throw new AppError(status.FORBIDDEN, 'Solo el administrador puede eliminar trámites');
    }
    await this.getById(id, user);
    return repository.delete(id);
  }
}

module.exports = new TramiteService();
