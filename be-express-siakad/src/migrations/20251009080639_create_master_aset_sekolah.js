/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("master_aset_sekolah", (table) => {
    table.increments("ASET_ID").primary();

    // kode unik aset
    table.string("KODE_ASET", 50).notNullable().unique();

    // nama dan jenis aset
    table.string("NAMA_ASET", 100).notNullable();
    table.string("JENIS_ASET", 50).notNullable();

    // jumlah dan kondisi
    table.integer("JUMLAH").unsigned().defaultTo(1);
    table
      .enu("KONDISI", ["Baik", "Rusak Ringan", "Rusak Berat"])
      .defaultTo("Baik");

    // relasi ke gedung
    table.integer("GEDUNG_ID").unsigned().nullable();
    table
      .foreign("GEDUNG_ID")
      .references("GEDUNG_ID")
      .inTable("master_gedung")
      .onDelete("SET NULL");

    // informasi keuangan
    table.string("SUMBER_DANA", 100).nullable();
    table.date("TANGGAL_PEMBELIAN").nullable();
    table.decimal("HARGA_SATUAN", 15, 2).defaultTo(0);
    table.decimal("TOTAL_HARGA", 15, 2).defaultTo(0);

    // keterangan & status
    table.text("KETERANGAN").nullable();
    table.enu("STATUS", ["Aktif", "Tidak Aktif"]).defaultTo("Aktif");

    // audit trail
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(
      knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    );

    // index tambahan
    table.index(["JENIS_ASET", "KONDISI"]);
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("master_aset_sekolah");
}
