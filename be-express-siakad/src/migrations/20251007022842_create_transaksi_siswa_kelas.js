/**
 * Migration: Create Transaksi Siswa Kelas
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.schema.createTable('transaksi_siswa_kelas', (table) => {
    table.increments('ID').primary();
    
    table.bigInteger('SISWA_ID').unsigned().notNullable();
    table.integer('KELAS_ID').unsigned().notNullable();
    
    table.integer('TAHUN_AJARAN').unsigned().notNullable();
    table.enu('STATUS', ['Aktif', 'Lulus', 'Pindah', 'Nonaktif']).defaultTo('Aktif');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Foreign key
    table.foreign('SISWA_ID').references('SISWA_ID').inTable('m_siswa').onDelete('CASCADE');
    table.foreign('KELAS_ID').references('KELAS_ID').inTable('m_kelas').onDelete('CASCADE');
  });
};

export const down = async function(knex) {
  return knex.schema.dropTableIfExists('transaksi_siswa_kelas');
};
