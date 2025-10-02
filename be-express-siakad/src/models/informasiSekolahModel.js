import { db } from "../core/config/knex.js";

/**
 * Helper untuk format tanggal ke YYYY-MM-DD
 */
const formatDate = (date) => {
  return date ? new Date(date).toISOString().split("T")[0] : null;
};

/**
 * Ambil semua informasi sekolah + jumlah siswa & guru (total aktif)
 */
export const getAllInformasiSekolah = async () => {
  return db("master_info_sekolah").select("*");
};

/**
 * Ambil informasi sekolah berdasarkan ID
 */
export const getInformasiSekolahById = async (id) => {
  return db("master_info_sekolah")
    .where("ID_SEKOLAH", id)
    .first();
};

/**
 * Tambah informasi sekolah baru
 */
export const createInformasiSekolah = async ({
  NAMA_SEKOLAH,
  ALAMAT,
  JENJANG_AKREDITASI,
  TANGGAL_AKREDITASI,
  NPSN,
  STATUS,
}) => {
  // Pastikan STATUS tidak undefined
  const finalStatus = STATUS ?? "Aktif";

  const [id] = await db("master_info_sekolah").insert({
    NAMA_SEKOLAH,
    ALAMAT,
    JENJANG_AKREDITASI,
    TANGGAL_AKREDITASI: formatDate(TANGGAL_AKREDITASI),
    NPSN,
    STATUS: finalStatus,
  });


  return getInformasiSekolahById(id);
};

/**
 * Update informasi sekolah
 */
export const updateInformasiSekolah = async (
  id,
  { NAMA_SEKOLAH, ALAMAT, JENJANG_AKREDITASI, TANGGAL_AKREDITASI, NPSN, STATUS }
) => {
  const finalStatus = STATUS ?? "Aktif";

  await db("master_info_sekolah")
    .where({ ID_SEKOLAH: id })
    .update({
      NAMA_SEKOLAH,
      ALAMAT,
      JENJANG_AKREDITASI,
      TANGGAL_AKREDITASI: formatDate(TANGGAL_AKREDITASI),
      NPSN,
      STATUS,
    });

  return getInformasiSekolahById(id);
};

/**
 * Hapus informasi sekolah
 */
export const deleteInformasiSekolah = async (id) =>
  db("master_info_sekolah").where({ ID_SEKOLAH: id }).del();
