/**
 * Migration: Create Master Jurusan
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('master_jurusan', (table) => {
    table.increments('JURUSAN_ID').primary();
    table.string('NAMA_JURUSAN', 100).notNullable();
    table.text('DESKRIPSI').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('master_jurusan');
}