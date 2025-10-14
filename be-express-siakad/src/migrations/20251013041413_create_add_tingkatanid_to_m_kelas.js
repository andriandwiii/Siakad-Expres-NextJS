/**
 * Migration: Tambah Kolom TINGKATAN_ID di m_kelas dan buat relasi ke master_tingkatan
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // Tambah kolom TINGKATAN_ID jika belum ada
  const exists = await knex.schema.hasColumn("m_kelas", "TINGKATAN_ID");
  if (!exists) {
    await knex.schema.alterTable("m_kelas", (table) => {
      table.integer("TINGKATAN_ID").unsigned().nullable();
      table
        .foreign("TINGKATAN_ID")
        .references("TINGKATAN_ID")
        .inTable("master_tingkatan")
        .onDelete("SET NULL");
    });
  }

  // Opsional: Hapus kolom lama "TINGKATAN"
  const hasOldColumn = await knex.schema.hasColumn("m_kelas", "TINGKATAN");
  if (hasOldColumn) {
    await knex.schema.alterTable("m_kelas", (table) => {
      table.dropColumn("TINGKATAN");
    });
  }
}

/**
 * Rollback migration: hapus kolom TINGKATAN_ID dan kembalikan kolom lama jika perlu
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  const exists = await knex.schema.hasColumn("m_kelas", "TINGKATAN_ID");
  if (exists) {
    await knex.schema.alterTable("m_kelas", (table) => {
      table.dropForeign("TINGKATAN_ID");
      table.dropColumn("TINGKATAN_ID");
    });
  }

  // Opsional: kembalikan kolom lama "TINGKATAN" jika kamu ingin rollback penuh
  const hasOldColumn = await knex.schema.hasColumn("m_kelas", "TINGKATAN");
  if (!hasOldColumn) {
    await knex.schema.alterTable("m_kelas", (table) => {
      table.string("TINGKATAN", 50).nullable();
    });
  }
}
    