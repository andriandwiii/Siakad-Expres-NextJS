import { db } from "../core/config/knex.js";

/**
 * Ambil semua informasi sekolah
 */
export const getAllInformasiSekolah = async () => {
  return db("master_informasi_sekolah").select("*");
};

/**
 * Ambil informasi sekolah berdasarkan ID
 */
export const getInformasiSekolahById = async (id) => {
  return db("master_informasi_sekolah")
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

  const [id] = await db("master_informasi_sekolah").insert({
    NAMA_SEKOLAH,
    ALAMAT,
    JENJANG_AKREDITASI,
    TANGGAL_AKREDITASI,
    NPSN,
    STATUS: finalStatus,
    CREATED_AT: db.fn.now(),
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

  await db("master_informasi_sekolah")
    .where({ ID_SEKOLAH: id })
    .update({
      NAMA_SEKOLAH,
      ALAMAT,
      JENJANG_AKREDITASI,
      TANGGAL_AKREDITASI,
      NPSN,
      STATUS: finalStatus,
      UPDATED_AT: db.fn.now(),
    });

  return getInformasiSekolahById(id);
};

/**
 * Hapus informasi sekolah
 */
export const deleteInformasiSekolah = async (id) => {
  return db("master_informasi_sekolah")
    .where({ ID_SEKOLAH: id })
    .del();
};
