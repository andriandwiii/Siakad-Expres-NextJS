/**
 * Migration: Create Master Kelas (PERBAIKAN NAMA TABEL)
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('m_kelas', (table) => {
    table.increments('KELAS_ID').primary();
    table.string('NAMA_KELAS', 50).notNullable();
    
    // Kolom Foreign Key
    table.integer('JURUSAN_ID').unsigned().notNullable();
    table.integer('GEDUNG_ID').unsigned().notNullable();
    
    table.string('TINGKATAN', 50).nullable(); 
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Definisi Foreign Key (menggunakan 'master_jurusan' dan 'master_gedung' seperti yang Anda definisikan)
    table.foreign('JURUSAN_ID').references('JURUSAN_ID').inTable('master_jurusan').onDelete('CASCADE');
    table.foreign('GEDUNG_ID').references('GEDUNG_ID').inTable('master_gedung').onDelete('CASCADE');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('m_kelas');
}