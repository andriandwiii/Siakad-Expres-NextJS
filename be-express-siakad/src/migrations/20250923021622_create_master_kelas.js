/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('master_kelas', (table) => {
    table.bigIncrements('KELAS_ID').primary();
    table.string('KODE_KELAS', 20).unique().notNullable();
    table.enu('TINGKAT', ['10', '11', '12']).notNullable();
    table.string('JURUSAN', 50).notNullable();
    table.string('NAMA_KELAS', 120).notNullable();
    table.enu('STATUS', ['Aktif', 'Tidak Aktif']).defaultTo('Aktif');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('master_kelas');
}
