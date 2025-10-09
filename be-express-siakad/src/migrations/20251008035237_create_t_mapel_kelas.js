/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("t_mapel_kelas", (table) => {
    table.increments("MAPEL_KELAS_ID").primary();

    // relasi ke kelas
    table.integer("KELAS_ID").unsigned().notNullable();
    table.foreign("KELAS_ID").references("KELAS_ID").inTable("m_kelas").onDelete("CASCADE");

    // relasi ke mapel
    table.bigInteger("MAPEL_ID").unsigned().notNullable();
    table.foreign("MAPEL_ID").references("MAPEL_ID").inTable("master_mata_pelajaran").onDelete("CASCADE");

    // relasi ke guru (boleh nullable kalau belum ada pengampu)
    table.bigInteger("GURU_ID").unsigned().nullable();
    table.foreign("GURU_ID").references("GURU_ID").inTable("m_guru").onDelete("SET NULL");

    // kode mapel khusus per kelas
    table.string("KODE_MAPEL", 30).notNullable();

    // timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));

    // kombinasi unik agar tidak ada duplikat mapel per kelas
    table.unique(["KELAS_ID", "KODE_MAPEL"]);

    // index untuk optimasi query
    table.index(["KELAS_ID", "MAPEL_ID"]);
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("t_mapel_kelas");
}
