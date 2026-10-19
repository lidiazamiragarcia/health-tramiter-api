const BaseRepository = require('../../core/repositories/base-repository'); const queries = require('./usuario.query');
class UsuarioRepository extends BaseRepository { constructor() { super(queries); } findByDocument(typeId, number) { return queries.findByDocument(typeId, number); } } module.exports = new UsuarioRepository();
UsuarioRepository.prototype.setPassword = function (id, passwordHash) { return queries.setPassword(id, passwordHash); };
