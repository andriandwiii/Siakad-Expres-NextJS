/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("master_ruangan", (table) => {
    table.bigIncrements("ID").primary(); // ID unik untuk setiap ruangan
    table.string("KODE_RUANGAN", 50).notNullable(); // Kode Ruangan
    table.string("NAMA_RUANGAN", 120).notNullable(); // Nama Ruangan
    table.string("LOKASI", 120).notNullable(); // Lokasi/Gedung
    table.string("JENIS_RUANGAN", 50).notNullable(); // Jenis Ruangan (misalnya: kelas, lab)
    table.integer("KAPASITAS").notNullable(); // Kapasitas ruangan
    table.enu("STATUS", ["Aktif", "Tidak Aktif"]).defaultTo("Aktif"); // Status ruangan
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Waktu dibuat
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Waktu diupdate
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("master_ruangan");
}
