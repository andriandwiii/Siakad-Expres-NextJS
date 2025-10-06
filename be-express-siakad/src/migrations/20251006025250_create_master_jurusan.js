/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("master_jurusan", (table) => {
    table.bigIncrements("JURUSAN_ID").primary(); // ID utama auto increment

    table.string("KODE_JURUSAN", 20).notNullable(); // Kode jurusan, contoh: TKJ
    table.string("KETERANGAN", 100).notNullable();  // Nama atau keterangan jurusan

    // Tambahkan created_at dan updated_at otomatis
    table.timestamp("CREATED_AT").defaultTo(knex.fn.now());
    table
      .timestamp("UPDATED_AT")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));

    // Pastikan kode_jurusan tidak boleh ganda
    table.unique(["KODE_JURUSAN"]);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists("master_jurusan");
}
