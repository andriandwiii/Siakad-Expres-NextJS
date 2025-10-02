/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("presensi", (table) => {
    table.bigIncrements("id").primary();

    // relasi ke absensi dan siswa
    table.bigInteger("absensi_id").unsigned().references("id").inTable("absensi").onDelete("CASCADE");
    table.bigInteger("siswa_id").unsigned().references("SISWA_ID").inTable("m_siswa").onDelete("CASCADE");

    table.enu("status", ["Hadir", "Izin", "Sakit", "Alpa"]).notNullable();
    table.decimal("lat", 10, 6).notNullable();
    table.decimal("lng", 10, 6).notNullable();
    table.timestamp("waktu").notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));

    table.unique(["absensi_id", "siswa_id"]); // pastikan siswa hanya absen 1x per absensi
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists("presensi");
}
