import { db } from "../core/config/knex.js";

const formatDate = (date) => {
  return date ? new Date(date).toISOString().split("T")[0] : null;
};

export const getAllInformasiSekolah = async () => {
  return db("master_info_sekolah").select("*");
};

export const getInformasiSekolahById = async (id) => {
  console.log("Fetching school with ID:", id);
  return db("master_info_sekolah").where({ id }).first();
};

export const createInformasiSekolah = async ({
  NAMA_SEKOLAH,
  ALAMAT,
  JENJANG_AKREDITASI,
  TANGGAL_AKREDITASI,
  NPSN,
  STATUS,
}) => {
  const formattedDate = formatDate(TANGGAL_AKREDITASI);
  const finalStatus = STATUS ?? "Aktif";

  const [id] = await db("master_info_sekolah").insert({
    NAMA_SEKOLAH,
    ALAMAT,
    JENJANG_AKREDITASI,
    TANGGAL_AKREDITASI: formattedDate,
    NPSN,
    STATUS: finalStatus,
    CREATED_AT: db.fn.now(),
  });

  return getInformasiSekolahById(id);
};

export const updateInformasiSekolah = async (
  id,
  { NAMA_SEKOLAH, ALAMAT, JENJANG_AKREDITASI, TANGGAL_AKREDITASI, NPSN, STATUS }
) => {
  console.log("Updating school with ID:", id);
  const formattedDate = formatDate(TANGGAL_AKREDITASI);
  const finalStatus = STATUS ?? "Aktif";

  await db("master_info_sekolah")
    .where({ id })
    .update({
      NAMA_SEKOLAH,
      ALAMAT,
      JENJANG_AKREDITASI,
      TANGGAL_AKREDITASI: formattedDate,
      NPSN,
      STATUS: finalStatus,
    });

  return getInformasiSekolahById(id);
};

export const deleteInformasiSekolah = async (id) => {
  console.log("Deleting school with ID:", id);
  return db("master_info_sekolah").where({ id }).del();
};
