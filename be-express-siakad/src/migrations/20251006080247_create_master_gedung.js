/**
 * Migration: Create Master Gedung
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('master_gedung', (table) => {
    table.increments('GEDUNG_ID').primary();  // Primary key
    table.string('NAMA_GEDUNG', 100).notNullable();  // Nama gedung
    table.string('LOKASI', 255).nullable();  // Lokasi gedung
    table.timestamp('created_at').defaultTo(knex.fn.now());  // Waktu dibuat
    table.timestamp('updated_at').defaultTo(knex.fn.now());  // Waktu diupdate
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('master_gedung');  // Menghapus tabel jika rollback
}
