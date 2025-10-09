// migrations/xxxx_create_t_jadwal.js

export async function up(knex) {
  return knex.schema.createTable("t_jadwal", (table) => {
    table.increments("JADWAL_ID").primary();

    // Relasi ke kelas
    table.integer("KELAS_ID").unsigned().notNullable();
    table.foreign("KELAS_ID").references("KELAS_ID").inTable("m_kelas").onDelete("CASCADE");

    // Relasi ke mapel_kelas
    table.integer("MAPEL_KELAS_ID").unsigned().notNullable();
    table.foreign("MAPEL_KELAS_ID").references("MAPEL_KELAS_ID").inTable("t_mapel_kelas").onDelete("CASCADE");

    // Relasi ke hari
    table.integer("HARI_ID").unsigned().notNullable();
    table.foreign("HARI_ID").references("HARI_ID").inTable("master_hari").onDelete("CASCADE");

    // Jam belajar
    table.time("JAM_MULAI").notNullable();
    table.time("JAM_SELESAI").notNullable();

    //timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("t_jadwal");
}
