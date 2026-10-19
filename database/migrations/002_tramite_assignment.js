exports.up = async function (knex) {
  const hasColumn = await knex.schema.hasColumn('tramites', 'assigned_tramitador_id');
  if (!hasColumn) {
    await knex.schema.table('tramites', (table) => {
      table.integer('assigned_tramitador_id').unsigned().nullable();
      table.timestamp('assigned_at').nullable();
      table.index(['assigned_tramitador_id'], 'idx_tramites_assigned');
      table
        .foreign('assigned_tramitador_id', 'fk_tramites_tramitador')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
    });
  }

  const hasContacts = await knex.schema.hasTable('tramitador_contacts');
  if (hasContacts) {
    await knex.schema.dropTable('tramitador_contacts');
  }
};

exports.down = async function (knex) {
  const hasContacts = await knex.schema.hasTable('tramitador_contacts');
  if (!hasContacts) {
    await knex.schema.createTable('tramitador_contacts', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('tramitador_id').unsigned().notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.unique(['tramitador_id', 'user_id'], 'uq_tramitador_user');
      table.foreign('tramitador_id').references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
      table.foreign('user_id').references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
    });
  }

  const hasColumn = await knex.schema.hasColumn('tramites', 'assigned_tramitador_id');
  if (hasColumn) {
    await knex.schema.table('tramites', (table) => {
      table.dropForeign('assigned_tramitador_id', 'fk_tramites_tramitador');
      table.dropIndex(['assigned_tramitador_id'], 'idx_tramites_assigned');
      table.dropColumn('assigned_at');
      table.dropColumn('assigned_tramitador_id');
    });
  }
};
