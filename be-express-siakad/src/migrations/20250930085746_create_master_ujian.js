/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("master_ujian", (table) => {
    table.bigIncrements("UJIAN_ID").primary(); // ID unik untuk setiap ujian
    table.string("NAMA_UJIAN", 100).notNullable(); // Nama ujian (misalnya: UTS, UAS, dll.)
    table.string("JENIS_UJIAN", 50).notNullable(); // Jenis ujian (UTS, UAS, dll.)
    table.date("TANGGAL_UJIAN").notNullable(); // Tanggal ujian
    table.bigInteger("MAPEL_ID").unsigned().notNullable(); // Ubah ke BIGINT UNSIGNED untuk ID mata pelajaran
    table.foreign("MAPEL_ID").references("MAPEL_ID").inTable("master_mapel"); // Relasi ke master_mapel

    table.timestamp("created_at").defaultTo(knex.fn.now()); // Waktu dibuat
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Waktu diupdate
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("master_ujian");
}
