/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("master_tingkatan", (table) => {
    table.increments("TINGKATAN_ID").primary(); // Primary Key
    table.enu("TINGKATAN", ["X", "XI", "XII"]).notNullable(); // Tingkatan values
    table.enu("STATUS", ["Aktif", "Tidak Aktif"]).defaultTo("Aktif"); // Status (Aktif or Tidak Aktif)
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Created At
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Updated At
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("master_tingkatan");
}
