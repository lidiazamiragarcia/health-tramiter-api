const BaseRepository = require('../../core/repositories/base-repository');
const queries = require('./rol.query');
class RolRepository extends BaseRepository { constructor() { super(queries); } }
module.exports = new RolRepository();
