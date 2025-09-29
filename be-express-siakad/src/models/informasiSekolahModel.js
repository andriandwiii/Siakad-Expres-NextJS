import { db } from "../core/config/knex.js";

/**
 * Ambil semua informasi sekolah + jumlah siswa & guru (total aktif)
 */
export const getAllInformasiSekolah = async () => {
  return db("master_informasi_sekolah as s")
    .select(
      "s.*",
      db("master_siswa").count("*").where("STATUS", "Aktif").as("JUMLAH_SISWA"),
      db("master_guru").count("*").where("STATUS", "Aktif").as("JUMLAH_GURU")
    );
};

/**
 * Ambil informasi sekolah berdasarkan ID
 */
export const getInformasiSekolahById = async (id) => {
  return db("master_informasi_sekolah as s")
    .select(
      "s.*",
      db("master_siswa").count("*").where("STATUS", "Aktif").as("JUMLAH_SISWA"),
      db("master_guru").count("*").where("STATUS", "Aktif").as("JUMLAH_GURU")
    )
    .where("s.ID_SEKOLAH", id)
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
  const [id] = await db("master_informasi_sekolah").insert({
    NAMA_SEKOLAH,
    ALAMAT,
    JENJANG_AKREDITASI,
    TANGGAL_AKREDITASI,
    NPSN,
    STATUS,
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
  await db("master_informasi_sekolah")
    .where({ ID_SEKOLAH: id })
    .update({ NAMA_SEKOLAH, ALAMAT, JENJANG_AKREDITASI, TANGGAL_AKREDITASI, NPSN, STATUS });

  return getInformasiSekolahById(id);
};

/**
 * Hapus informasi sekolah
 */
export const deleteInformasiSekolah = async (id) =>
  db("master_informasi_sekolah").where({ ID_SEKOLAH: id }).del();
