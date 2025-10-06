/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("master_gedung", (table) => {
    table.bigIncrements("GEDUNG_ID").primary();

    table.string("KODE_GEDUNG", 20).notNullable();
    table.string("NAMA_GEDUNG", 100).notNullable();
    table.integer("JUMLAH_LANTAI").unsigned().defaultTo(1);
    table.integer("KAPASITAS").unsigned().defaultTo(0);
    table
      .enu("KONDISI", ["Baik", "Rusak Ringan", "Rusak Berat"])
      .defaultTo("Baik");
    table.integer("TAHUN_DIBANGUN").unsigned();
    table.decimal("LUAS_BANGUNAN", 10, 2);
    table.string("LETAK", 255);
    table.text("KETERANGAN");

    // 🔽 Ubah bagian ini
    table
      .enu("STATUS", ["Aktif", "Tidak Aktif"])
      .notNullable()
      .defaultTo("Aktif")
      .comment("Status gedung");

    table.timestamp("CREATED_AT").defaultTo(knex.fn.now());
    table
      .timestamp("UPDATED_AT")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));

    table.unique(["KODE_GEDUNG"]);
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("master_gedung");
}
