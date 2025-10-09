/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.alterTable('m_siswa', (table) => {
    table.dropColumn('KELAS');
    table.dropColumn('JURUSAN');
    table.dropColumn('TAHUN_MASUK');
  });
};

export const down = async function (knex) {
  await knex.schema.alterTable('m_siswa', (table) => {
    table.string('KELAS', 50);
    table.string('JURUSAN', 50);
    table.integer('TAHUN_MASUK', 4);
  });
};
