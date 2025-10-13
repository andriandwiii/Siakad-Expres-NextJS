/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('t_absensi_siswa', (table) => {
    table.increments('ABSENSI_ID').primary();

    // Relasi ke siswa
    table.bigInteger('SISWA_ID').unsigned().notNullable();
    table.foreign('SISWA_ID').references('SISWA_ID').inTable('m_siswa').onDelete('CASCADE');

    // Relasi ke jadwal (otomatis tahu mapel dan guru)
    table.integer('JADWAL_ID').unsigned().notNullable();
    table.foreign('JADWAL_ID').references('JADWAL_ID').inTable('t_jadwal').onDelete('CASCADE');

    // Data absensi
    table.date('TANGGAL').notNullable();
    table.time('JAM_ABSEN').notNullable();
    table.enu('STATUS', ['Hadir', 'Izin', 'Sakit', 'Alpa']).defaultTo('Hadir');

    table.text('KETERANGAN').nullable();

    // Timestamps
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('t_absensi_siswa');
}
