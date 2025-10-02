/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("absensi", (table) => {
    table.bigIncrements("id").primary();

    // relasi ke guru
    table.bigInteger("guru_id").unsigned().references("GURU_ID").inTable("M_Guru").onDelete("CASCADE");

    table.string("kelas", 50).notNullable();
    table.string("mapel", 100).notNullable();
    table.time("jam_mulai").notNullable();
    table.time("jam_selesai").notNullable();
    table.text("catatan").nullable();
    table.date("tanggal").notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists("absensi");
}
