/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('master_agama', (table) => {
    table.increments('IDAGAMA').primary(); // Primary Key, Auto Increment
    table.string('NAMAAGAMA', 50).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('master_agama');
}
