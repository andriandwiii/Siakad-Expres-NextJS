/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('m_orangtua_wali', (table) => {
    table.bigIncrements('ORTU_ID').primary();

    // Relasi ke siswa
    table.bigInteger('SISWA_ID').unsigned()
      .references('SISWA_ID').inTable('m_siswa')
      .onDelete('CASCADE');

    // Jenis (Ayah, Ibu, Wali)
    table.enu('JENIS', ['Ayah', 'Ibu', 'Wali']).notNullable();

    // Data orang tua / wali
    table.string('NAMA', 120).notNullable();
    table.string('PEKERJAAN', 100);
    table.string('PENDIDIKAN', 50);
    table.text('ALAMAT');
    table.string('NO_HP', 20);

    // Data sistem
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTableIfExists('m_orangtua_wali');
};
