/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('m_siswa', (table) => {
    table.bigIncrements('SISWA_ID').primary();

    // relasi ke tabel users
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');

    // data siswa
    table.string('NIS', 20).unique().notNullable();
    table.string('NISN', 20).unique().notNullable();
    table.string('NAMA', 120).notNullable();
    table.enu('GENDER', ['L', 'P']).notNullable();
    table.date('TGL_LAHIR');
    table.enu('STATUS', ['Aktif', 'Lulus', 'Nonaktif']).defaultTo('Aktif');
    table.string('EMAIL', 120).unique().notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTableIfExists('m_siswa');
};
