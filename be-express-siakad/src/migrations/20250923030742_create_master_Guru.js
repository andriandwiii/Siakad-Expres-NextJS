/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("master_guru", (table) => {
    table.bigIncrements("GURU_ID").primary();
    table.string("NIP", 30).unique().notNullable();
    table.string("NAMA", 120).notNullable();
    table.string("GELAR", 50).nullable();
    table.string("PANGKAT", 50).nullable();
    table.string("JABATAN", 50).nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("master_guru");
}
