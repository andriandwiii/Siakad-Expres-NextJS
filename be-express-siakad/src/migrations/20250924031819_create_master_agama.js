/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.export.up = function(knex) {
  return knex.schema.createTable('master_agama', function(table) {
    table.increments('id').primary(); // Primary Key, Auto Increment
    table.string('NAMAAGAMA', 100).notNullable(); // Nama agama
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Tanggal dibuat
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Tanggal diupdate
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.export.down = function(knex) {
  return knex.schema.dropTableIfExists('master_agama');  // Menghapus tabel jika rollback
};
