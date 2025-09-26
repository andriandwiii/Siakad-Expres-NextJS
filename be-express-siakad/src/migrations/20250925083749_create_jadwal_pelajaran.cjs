module.exports = {
  up: function(knex) {
    return knex.schema.createTable('jadwal_pelajaran', function(table) {
      table.increments('id').primary();
      table.integer('mata_pelajaran_id').unsigned().notNullable();
      table.integer('guru_id').unsigned().notNullable();
      table.integer('kelas_id').unsigned().notNullable();
      table.string('hari').notNullable();
      table.time('jam_mulai').notNullable();
      table.time('jam_selesai').notNullable();
      table.string('lokasi').notNullable();

      // Menambahkan foreign key
      table.foreign('mata_pelajaran_id').references('id').inTable('master_mapel');
      table.foreign('guru_id').references('id').inTable('master_guru');
      table.foreign('kelas_id').references('id').inTable('master_kelas');

      table.timestamps(true, true);
    });
  },

  down: function(knex) {
    return knex.schema.dropTableIfExists('jadwal_pelajaran');
  }
};
