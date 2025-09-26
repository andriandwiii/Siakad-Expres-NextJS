/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('master_mapel', (table) => {
    table.bigIncrements('MAPEL_ID').primary();
    table.string('KODE_MAPEL', 20).unique().notNullable();
    table.string('NAMA_MAPEL', 120).notNullable();
    table.string('KATEGORI', 50).notNullable(); // misal: Wajib, Peminatan, Muatan Lokal
    table.enu('STATUS', ['Aktif', 'Tidak Aktif']).defaultTo('Aktif');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('master_mapel');
}
