/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("master_waktu_pelajaran", (table) => {
    table.bigIncrements("ID").primary(); // ID unik untuk setiap waktu pelajaran
    table.string("HARI", 20).notNullable(); // Hari pelajaran (Senin, Selasa, dll.)
    table.time("JAM_MULAI").notNullable(); // Waktu mulai pelajaran
    table.time("JAM_SELESAI").notNullable(); // Waktu selesai pelajaran
    table.integer("DURASI").notNullable(); // Durasi pelajaran dalam menit
    table.string("MATA_PELAJARAN", 120).notNullable(); // Mata pelajaran
    table.string("KELAS", 50).notNullable(); // Kelas yang mengikuti
    table.string("RUANGAN", 50).notNullable(); // Ruang pelajaran
    table.string("GURU_PENGAJAR", 120).notNullable(); // Nama guru yang mengajar
    table.enu("STATUS", ["Aktif", "Tidak Aktif"]).defaultTo("Aktif"); // Status jadwal
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Waktu dibuat
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Waktu diupdate
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("master_waktu_pelajaran");
}
