/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("master_kurikulum", (table) => {
    table.bigIncrements("KURIKULUM_ID").primary();
    table.string("NAMA_KURIKULUM", 120).notNullable();
    table.string("TAHUN", 10).notNullable();
    table.string("DESKRIPSI").nullable();
    table.enu("STATUS", ["aktif", "nonaktif"]).defaultTo("aktif");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("master_kurikulum");
}
