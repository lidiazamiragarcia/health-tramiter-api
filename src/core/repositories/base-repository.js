class BaseRepository {
  constructor(queries) { this.queries = queries; }
  findAll() { return this.queries.findAll(); }
  findById(id) { return this.queries.findById(id); }
  create(data) { return this.queries.create(data); }
  update(id, data) { return this.queries.update(id, data); }
  delete(id) { return this.queries.delete(id); }
  exists(value) { return this.queries.exists(value); }
}
module.exports = BaseRepository;
