/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.up = function(knex) {
  return knex.schema.createTable('master_info_sekolah', function(table) {
    table.increments('id').primary(); // Primary Key, Auto Increment
    table.string('ALAMAT', 255).notNullable(); // Alamat sekolah
    table.string('JENJANG_AKREDITASI', 100); // Jenjang Akreditasi
    table.string('NAMA_SEKOLAH', 255).notNullable(); // Nama Sekolah
    table.string('NPSN', 20).notNullable(); // Nomor Pokok Sekolah Nasional
    table.string('STATUS', 50); // Status sekolah
    table.timestamp('TANGGAL_AKREDITASI').defaultTo(knex.fn.now()); // Tanggal Akreditasi
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Tanggal dibuat
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Tanggal diupdate
  });
};

module.exports.down = function(knex) {
  return knex.schema.dropTableIfExists('master_info_sekolah');
};
