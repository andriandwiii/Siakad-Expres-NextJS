/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("M_Guru", (table) => {
    table.bigIncrements("GURU_ID").primary();

    // relasi ke tabel users
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");

    // data pokok
    table.string("NIP", 30).unique().notNullable(); // Nomor Induk Pegawai
    table.string("NAMA", 120).notNullable();
    table.string("GELAR_DEPAN", 20).nullable();
    table.string("GELAR_BELAKANG", 20).nullable();
    table.string("PANGKAT", 50).nullable();
    table.string("JABATAN", 50).nullable();
    table.enu("STATUS_KEPEGAWAIAN", ["Aktif", "Cuti", "Pensiun"]).defaultTo("Aktif");

    // data pribadi
    table.enu("GENDER", ["L", "P"]).notNullable();
    table.date("TGL_LAHIR").nullable();
    table.string("TEMPAT_LAHIR", 120).nullable();
    table.string("EMAIL", 120).unique().notNullable();
    table.string("NO_TELP", 20).nullable();
    table.string("ALAMAT", 255).nullable();

    
    // timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));


    // index
    table.index(["NIP", "NAMA", "EMAIL"]);
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("M_Guru");
}
