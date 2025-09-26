/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // Buat tabel master_aset_sekolah
  return knex.schema.createTable("master_aset_sekolah", (table) => {
    table.bigIncrements("ID").primary();
    table.string("NAMA_BARANG", 255).notNullable();
    table.string("MERK_TYPE", 255).nullable();
    table.integer("JUMLAH_BARANG").defaultTo(0);
    table.string("ASAL_USUL_PEROLEHAN", 255).nullable();
    table.string("PERIODE", 20).nullable();
    table.text("KETERANGAN").nullable();
    table.enu("STATUS", ["Aktif", "Tidak Aktif"]).defaultTo("Aktif");
    table.timestamp("CREATED_AT").defaultTo(knex.fn.now());
    table.timestamp("UPDATED_AT").defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  // Hapus tabel master_aset_sekolah
  return knex.schema.dropTableIfExists("master_aset_sekolah");
}