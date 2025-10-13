// src/migrations/20251002072202_create_tahun_ajaran_table.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Ubah baris ini
export function up(knex) {
  return knex.schema.createTable('tahun_ajaran', (table) => {
    table.increments('TAHUN_AJARAN_ID').primary();
    table.string('NAMA_TAHUN_AJARAN', 50).notNullable();
    table.date('TANGGAL_MULAI').notNullable();
    table.date('TANGGAL_SELESAI').notNullable();
    table.enu('STATUS', ['Aktif', 'Tidak Aktif']).defaultTo('Tidak Aktif');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Ubah baris ini juga
export function down(knex) {
  return knex.schema.dropTableIfExists('tahun_ajaran');
};