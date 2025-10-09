/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('m_siswa', (table) => {
    table.bigIncrements('SISWA_ID').primary();

    // Relasi ke tabel users (login akun)
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');

    // Data identitas siswa
    table.string('NIS', 20).unique().notNullable();
    table.string('NISN', 20).unique().notNullable();
    table.string('NAMA', 120).notNullable();
    table.enu('GENDER', ['L', 'P']).notNullable();
    table.string('TEMPAT_LAHIR', 100);
    table.date('TGL_LAHIR');
    table.string('AGAMA', 50);
    table.text('ALAMAT');
    table.string('NO_TELP', 20);
    table.string('EMAIL', 120).unique().notNullable();

    // Data akademik
    table.string('KELAS', 50);   // contoh: X IPA 1
    table.string('JURUSAN', 50); // IPA, IPS, Bhs
    table.integer('TAHUN_MASUK',4);
    table.enu('STATUS', ['Aktif', 'Lulus', 'Pindah', 'Nonaktif']).defaultTo('Aktif');

    // Data tambahan
    table.string('GOL_DARAH', 5);
    table.integer('TINGGI'); // cm
    table.integer('BERAT');  // kg
    table.string('KEBUTUHAN_KHUSUS', 120);
    table.string('FOTO', 255);

    // Data sistem
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

export const down = async function (knex) {
  await knex.schema.dropTableIfExists('m_siswa');
};
