/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('master_info_sekolah', function(table) {
    // --- Kunci Utama ---
    table.increments('id').primary();

    // --- Identitas Utama Sekolah ---
    table.string('nama_sekolah', 255).notNullable();
    table.string('npsn', 20).notNullable().unique();
    table.string('nss', 20);
    table.string('jenjang_pendidikan', 50);
    table.string('status_sekolah', 50).notNullable();
    table.text('visi');
    table.text('misi');
    table.string('motto', 255);

    // --- Informasi Alamat & Kontak ---
    table.text('alamat_jalan').notNullable();
    table.string('rt', 5);
    table.string('rw', 5);
    table.string('kelurahan_desa', 100).notNullable();
    table.string('kecamatan', 100).notNullable();
    table.string('kabupaten_kota', 100).notNullable();
    table.string('provinsi', 100).notNullable();
    table.string('kode_pos', 10);
    table.string('telepon', 20);
    table.string('fax', 20);
    table.string('email', 100);
    table.string('website', 255);

    // --- Detail Akreditasi ---
    table.string('akreditasi', 5);
    table.string('no_sk_akreditasi', 100);
    table.date('tanggal_sk_akreditasi');
    table.date('tanggal_akhir_akreditasi');
    
    // --- Informasi Kepala Sekolah ---
    table.string('nama_kepala_sekolah', 255);
    table.string('nip_kepala_sekolah', 30);
    table.string('email_kepala_sekolah', 100);
    table.string('no_hp_kepala_sekolah', 20);

    // --- Data Legal & Tambahan ---
    table.string('penyelenggara', 150);
    table.string('no_sk_pendirian', 100);
    table.date('tanggal_sk_pendirian');
    table.string('no_sk_izin_operasional', 100);
    table.date('tanggal_sk_izin_operasional');
    table.decimal('lintang', 10, 8);
    table.decimal('bujur', 11, 8);
    table.string('logo_sekolah_url', 255);

    // --- Informasi Finansial & Bantuan ---
    table.string('nama_bank', 100); // Untuk dana BOS
    table.string('nomor_rekening', 50);
    table.string('nama_pemilik_rekening', 255);
    table.string('npwp', 25); // NPWP sekolah atau yayasan

    // --- Detail Operasional & Kurikulum ---
    table.string('kurikulum_digunakan', 100); // Contoh: Kurikulum Merdeka, K-13
    table.string('waktu_penyelenggaraan', 100); // Contoh: Pagi, Siang, Kombinasi
    table.string('sumber_listrik', 50); // Contoh: PLN, Genset
    table.string('akses_internet', 100); // Contoh: Telkom, Biznet
    table.integer('kecepatan_internet_mbps');

    // --- Kontak Penting Lainnya ---
    table.string('nama_operator_dapodik', 255);
    table.string('email_operator_dapodik', 100);
    table.string('no_hp_operator_dapodik', 20);
    table.string('nama_ketua_komite', 255);

    // --- Informasi Digital & Media Sosial ---
    table.string('facebook_url', 255);
    table.string('instagram_url', 255);
    table.string('twitter_x_url', 255);
    table.string('youtube_url', 255);

    // --- Status & Timestamps ---
    table.boolean('is_active').defaultTo(true); // Status aktif sekolah
    table.timestamp('last_sync_dapodik'); // Kapan terakhir sinkron dengan data pusat
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('master_info_sekolah');
};