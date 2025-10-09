import { db } from "../core/config/knex.js";

const table = "transaksi_siswa_kelas";

// Ambil semua transaksi siswa
export const getAllTransaksi = async () => {
  const rows = await db(table)
    .select(
      'transaksi_siswa_kelas.*',
      'm_siswa.NAMA as NAMA_SISWA',
      'm_siswa.SISWA_ID as SISWA_ID',
      'm_kelas.NAMA_KELAS',
      'm_kelas.KELAS_ID',
      'm_kelas.TINGKATAN',
      'master_jurusan.NAMA_JURUSAN'
    )
    .leftJoin('m_siswa', 'transaksi_siswa_kelas.SISWA_ID', 'm_siswa.SISWA_ID')
    .leftJoin('m_kelas', 'transaksi_siswa_kelas.KELAS_ID', 'm_kelas.KELAS_ID')
    .leftJoin('master_jurusan', 'm_kelas.JURUSAN_ID', 'master_jurusan.JURUSAN_ID')
    .orderBy('transaksi_siswa_kelas.ID', 'desc');

  // Buat nested object untuk frontend
    return rows.map(r => ({
    ...r,
    siswa: { NAMA: r.NAMA_SISWA, SISWA_ID: r.SISWA_ID },
    kelas: {
        TINGKATAN: r.TINGKATAN,          // tambahkan ini
        NAMA_JURUSAN: r.NAMA_JURUSAN,
        NAMA_KELAS: r.NAMA_KELAS,
        KELAS_ID: r.KELAS_ID
    }
    }));

};

// Tambah siswa ke kelas
export const createTransaksi = async (data) => {
  const [id] = await db(table).insert(data);
  return db(table).where({ ID: id }).first();
};

// Update transaksi
export const updateTransaksi = async (id, data) => {
  const trx = await db(table).where({ ID: id }).first();
  if (!trx) return null;
  await db(table).where({ ID: id }).update(data);
  return db(table).where({ ID: id }).first();
};

// Hapus transaksi
export const deleteTransaksi = async (id) => {
  const transaksi = await db(table).where({ ID: id }).first();
  if (!transaksi) return null;
  await db(table).where({ ID: id }).del();
  return transaksi;
};
