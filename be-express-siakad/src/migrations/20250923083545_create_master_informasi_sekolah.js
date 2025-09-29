/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('master_informasi_sekolah', (table) => {
    table.bigIncrements('ID_SEKOLAH').primary(); // Primary Key
    table.string('NAMA_SEKOLAH', 150).notNullable();
    table.text('ALAMAT').notNullable();
    table.enu('JENJANG_AKREDITASI', ['A', 'B', 'C']).notNullable();
    table.date('TANGGAL_AKREDITASI');
    table.string('NPSN', 20).unique().notNullable();
    table.enu('STATUS', ['Aktif', 'Nonaktif']).defaultTo('Aktif');
    table.integer('JUMLAH_SISWA').defaultTo(0);
    table.integer('JUMLAH_GURU').defaultTo(0);

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('master_informasi_sekolah');
}
