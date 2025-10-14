/**
 * Migration: Tambah Kolom RUANG_ID di m_kelas dan buat relasi ke master_ruang_kelas
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const exists = await knex.schema.hasColumn("m_kelas", "RUANG_ID");
  if (!exists) {
    await knex.schema.alterTable("m_kelas", (table) => {
      table.integer("RUANG_ID").unsigned().notNullable();
      table
        .foreign("RUANG_ID")
        .references("RUANG_ID")
        .inTable("master_ruang_kelas")
        .onDelete("CASCADE");
    });
  }

  const hasOldColumn = await knex.schema.hasColumn("m_kelas", "NAMA_KELAS");
  if (hasOldColumn) {
    await knex.schema.alterTable("m_kelas", (table) => {
      table.dropColumn("NAMA_KELAS");
    });
  }
}

/**
 * Rollback migration: hapus kolom RUANG_ID dan kembalikan kolom lama jika perlu
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  const exists = await knex.schema.hasColumn("m_kelas", "RUANG_ID");
  if (exists) {
    await knex.schema.alterTable("m_kelas", (table) => {
      table.dropForeign("RUANG_ID");
      table.dropColumn("RUANG_ID");
    });
  }

  const hasOldColumn = await knex.schema.hasColumn("m_kelas", "NAMA_KELAS");
  if (!hasOldColumn) {
    await knex.schema.alterTable("m_kelas", (table) => {
      table.string("NAMA_KELAS", 50).notNullable();
    });
  }
}
