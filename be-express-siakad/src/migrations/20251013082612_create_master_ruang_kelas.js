/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */export async function up(knex) {
  return knex.schema.createTable("master_ruang_kelas", (table) => {
    table.increments("RUANG_ID").primary();       // ID ruang kelas
    table.string("NAMA_RUANG", 50).notNullable(); // Nama ruang kelas, misal: X IPA 1
    table.string("DESKRIPSI", 255).nullable();    // Deskripsi tambahan
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("master_ruang_kelas");
}
