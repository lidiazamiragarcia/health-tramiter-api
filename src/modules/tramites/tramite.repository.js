const queries = require('./tramite.query');

class TramiteRepository {
  findAll() { return queries.findAll(); }
  findByUserId(userId) { return queries.findByUserId(userId); }
  countAvailable() { return queries.countAvailable(); }
  findAvailable(pagination) { return queries.findAvailable(pagination); }
  findByAssignedTramitador(tramitadorId) { return queries.findByAssignedTramitador(tramitadorId); }
  findById(id) { return queries.findById(id); }
  create(data) { return queries.create(data); }
  assignToTramitador(id, tramitadorId) { return queries.assignToTramitador(id, tramitadorId); }
  update(id, data) { return queries.update(id, data); }
  delete(id) { return queries.delete(id); }
}

module.exports = new TramiteRepository();
