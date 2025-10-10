/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("m_mapel", (table) => {
    table.increments("MAPEL_ID").primary();       // ID Mapel auto increment
    table.string("KODE_MAPEL", 20).notNullable(); // Kode mapel
    table.string("NAMA_MAPEL", 100).notNullable(); // Nama mapel
    table.string("TINGKAT", 10).notNullable();    // Jenjang: SMA / SMK
    table.string("JURUSAN", 50).notNullable();    // Jurusan: IPA, IPS, TKJ, AK/BIS, dll
    table.integer("JUMLAH_JAM").notNullable();    // Jumlah jam
    table.string("KATEGORI", 50).notNullable();   // Wajib / Pilihan
    table.text("KETERANGAN").nullable();          // Keterangan tambahan
    table.string("STATUS", 20).notNullable().defaultTo("Aktif"); // Status mapel
    table.timestamps(true, true);                 // created_at & updated_at
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists("m_mapel");
}
