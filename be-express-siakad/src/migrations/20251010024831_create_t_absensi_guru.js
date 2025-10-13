/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('t_absensi_guru', (table) => {
    table.increments('ABSENSI_ID').primary();

    // Relasi ke guru
    table.bigInteger('GURU_ID').unsigned().notNullable();
    table.foreign('GURU_ID').references('GURU_ID').inTable('M_Guru').onDelete('CASCADE');

    // Data absensi dan lokasi
    table.date('TANGGAL').notNullable();
    table.time('JAM_MASUK').nullable();
    table.time('JAM_PULANG').nullable();

    table.decimal('LATITUDE', 10, 7).nullable();
    table.decimal('LONGITUDE', 10, 7).nullable();

    // Jarak validasi ke titik sekolah (meter)
    table.integer('JARAK_SEKOLAH').nullable();

    // Status hadir
    table.enu('STATUS', ['Hadir', 'Terlambat', 'Izin', 'Sakit', 'Alpa']).defaultTo('Hadir');

    // Keterangan tambahan
    table.text('CATATAN').nullable();

    // Timestamps
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('t_absensi_guru');
}

