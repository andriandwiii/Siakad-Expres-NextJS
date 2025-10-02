exports.up = function(knex) {
  return knex.schema.createTable('master_info_sekolah', function(table) {
    table.increments('id').primary();
    table.string('ALAMAT', 255).notNullable();
    table.string('JENJANG_AKREDITASI', 100);
    table.string('NAMA_SEKOLAH', 255).notNullable();
    table.string('NPSN', 20).notNullable();
    table.string('STATUS', 50);
    table.dateTime('TANGGAL_AKREDITASI');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('master_info_sekolah');
};
