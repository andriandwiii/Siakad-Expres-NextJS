

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('master_agama', function(table) {
    table.increments('IDAGAMA').primary(); // Primary Key, Auto Increment
    table.string('NAMAAGAMA', 100).notNullable(); // Nama agama
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Tanggal dibuat
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Tanggal diupdate
  });
};
export async function down(knex) {
  return knex.schema.dropTableIfExists("master_agama");
}

