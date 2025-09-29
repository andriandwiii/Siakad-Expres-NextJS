/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('master_siswa', (table) => {
    table.bigIncrements('SISWA_ID').primary();
    table.string('NIS', 20).unique();
    table.string('NISN', 20).unique();
    table.string('NAMA', 120).notNullable();
    table.enu('GENDER', ['L', 'P']).notNullable();
    table.date('TGL_LAHIR');
    table.enu('STATUS', ['Aktif', 'Lulus', 'Nonaktif']).defaultTo('Aktif');
    table.string('EMAIL', 120).unique();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTableIfExists('master_siswa');
};
