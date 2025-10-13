/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('master_info_sekolah', function (table) {
    // --- Kunci Utama ---
    table.increments('INFO_ID').primary();

    // --- Identitas Utama Sekolah ---
    table.string('NAMA_SEKOLAH', 255).notNullable();
    table.string('NPSN', 20).notNullable().unique();
    table.string('NSS', 20);
    table.string('JENJANG_PENDIDIKAN', 50);
    table.string('STATUS_SEKOLAH', 50).notNullable();
    table.text('VISI');
    table.text('MISI');
    table.string('MOTTO', 255);

    // --- Informasi Alamat & Kontak ---
    table.text('ALAMAT_JALAN').notNullable();
    table.string('RT', 5);
    table.string('RW', 5);
    table.string('KELURAHAN_DESA', 100).notNullable();
    table.string('KECAMATAN', 100).notNullable();
    table.string('KABUPATEN_KOTA', 100).notNullable();
    table.string('PROVINSI', 100).notNullable();
    table.string('KODE_POS', 10);
    table.string('TELEPON', 20);
    table.string('FAX', 20);
    table.string('EMAIL', 100);
    table.string('WEBSITE', 255);

    // --- Detail Akreditasi ---
    table.string('AKREDITASI', 5);
    table.string('NO_SK_AKREDITASI', 100);
    table.date('TANGGAL_SK_AKREDITASI');
    table.date('TANGGAL_AKHIR_AKREDITASI');

    // --- Informasi Kepala Sekolah ---
    table.string('NAMA_KEPALA_SEKOLAH', 255);
    table.string('NIP_KEPALA_SEKOLAH', 30);
    table.string('EMAIL_KEPALA_SEKOLAH', 100);
    table.string('NO_HP_KEPALA_SEKOLAH', 20);

    // --- Data Legal & Tambahan ---
    table.string('PENYELENGGARA', 150);
    table.string('NO_SK_PENDIRIAN', 100);
    table.date('TANGGAL_SK_PENDIRIAN');
    table.string('NO_SK_IZIN_OPERASIONAL', 100);
    table.date('TANGGAL_SK_IZIN_OPERASIONAL');
    table.decimal('LINTANG', 10, 8);
    table.decimal('BUJUR', 11, 8);
    table.string('LOGO_SEKOLAH_URL', 255);

    // --- Informasi Finansial & Bantuan ---
    table.string('NAMA_BANK', 100);
    table.string('NOMOR_REKENING', 50);
    table.string('NAMA_PEMILIK_REKENING', 255);
    table.string('NPWP', 25);

    // --- Detail Operasional & Kurikulum ---
    table.string('KURIKULUM_DIGUNAKAN', 100);
    table.string('WAKTU_PENYELENGGARAAN', 100);
    table.string('SUMBER_LISTRIK', 50);
    table.string('AKSES_INTERNET', 100);
    table.integer('KECEPATAN_INTERNET_MBPS');

    // --- Kontak Penting Lainnya ---
    table.string('NAMA_OPERATOR_DAPODIK', 255);
    table.string('EMAIL_OPERATOR_DAPODIK', 100);
    table.string('NO_HP_OPERATOR_DAPODIK', 20);
    table.string('NAMA_KETUA_KOMITE', 255);

    // --- Informasi Digital & Media Sosial ---
    table.string('FACEBOOK_URL', 255);
    table.string('INSTAGRAM_URL', 255);
    table.string('TWITTER_X_URL', 255);
    table.string('YOUTUBE_URL', 255);

    // --- Status & Timestamps ---
    table.boolean('IS_ACTIVE').defaultTo(true);
    table.timestamp('LAST_SYNC_DAPODIK');
    table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
    table.timestamp('UPDATED_AT').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('master_info_sekolah');
}
