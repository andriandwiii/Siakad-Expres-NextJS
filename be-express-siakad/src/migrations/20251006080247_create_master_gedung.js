/**
 * Migration: Create Master Gedung
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('master_gedung', (table) => {
    table.increments('GEDUNG_ID').primary();
    table.string('NAMA_GEDUNG', 100).notNullable();
    table.string('LOKASI', 255).nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('master_gedung');
}