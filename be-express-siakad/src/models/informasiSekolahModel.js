// src/models/masterMapelModel.js
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
  console.log("Fetching school with ID:", id);  // Debugging line
  return db("master_info_sekolah")
    .where({ id }) // Menggunakan 'id' sebagai kolom pencarian
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
  // Mengonversi TANGGAL_AKREDITASI ke format yang diterima MySQL (YYYY-MM-DD HH:MM:SS)
  const formattedDate = new Date(TANGGAL_AKREDITASI).toISOString().slice(0, 19).replace('T', ' ');

  // Pastikan STATUS tidak undefined
  const finalStatus = STATUS ?? "Aktif";

  // Menyimpan data ke tabel master_info_sekolah
  const [id] = await db("master_info_sekolah").insert({
    NAMA_SEKOLAH,
    ALAMAT,
    JENJANG_AKREDITASI,
<<<<<<< HEAD
    TANGGAL_AKREDITASI: formattedDate, // Menggunakan tanggal yang diformat
=======
    TANGGAL_AKREDITASI: formatDate(TANGGAL_AKREDITASI),
>>>>>>> 85d5a36d030c05121d3dbcd4a8dc0b44af86b7dd
    NPSN,
    STATUS: finalStatus,
  });

<<<<<<< HEAD
  // Mengambil data yang baru disimpan
=======

>>>>>>> 85d5a36d030c05121d3dbcd4a8dc0b44af86b7dd
  return getInformasiSekolahById(id);
};

/**
 * Update informasi sekolah berdasarkan ID
 */
export const updateInformasiSekolah = async (
  id,
  { NAMA_SEKOLAH, ALAMAT, JENJANG_AKREDITASI, TANGGAL_AKREDITASI, NPSN, STATUS }
) => {
  // Debugging line untuk melihat apakah ID valid
  console.log("Updating school with ID:", id);

  // Mengonversi TANGGAL_AKREDITASI ke format yang diterima MySQL (YYYY-MM-DD HH:MM:SS)
  const formattedDate = new Date(TANGGAL_AKREDITASI).toISOString().slice(0, 19).replace('T', ' ');

  // Pastikan STATUS tidak undefined
  const finalStatus = STATUS ?? "Aktif";

  // Melakukan update data di tabel master_info_sekolah
  await db("master_info_sekolah")
    .where({ id }) // Menggunakan 'id' sebagai parameter pencarian
    .update({
      NAMA_SEKOLAH,
      ALAMAT,
      JENJANG_AKREDITASI,
<<<<<<< HEAD
      TANGGAL_AKREDITASI: formattedDate, // Menggunakan tanggal yang diformat
=======
      TANGGAL_AKREDITASI: formatDate(TANGGAL_AKREDITASI),
>>>>>>> 85d5a36d030c05121d3dbcd4a8dc0b44af86b7dd
      NPSN,
      STATUS,
    });

  // Mengambil data yang telah diperbarui
  return getInformasiSekolahById(id);
};

/**
 * Hapus informasi sekolah berdasarkan ID
 */
export const deleteInformasiSekolah = async (id) => {
  console.log("Deleting school with ID:", id); // Debugging line
  return db("master_info_sekolah").where({ id }).del(); // Menggunakan 'id' untuk menghapus data
};
