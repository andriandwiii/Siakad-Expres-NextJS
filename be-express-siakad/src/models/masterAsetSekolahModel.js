import { db } from "../core/config/knex.js";

/**
 * Get all aset sekolah
 **/
export const getAllAset = async () =>
  db("master_aset_sekolah").select("*");

/**
 * Get aset sekolah by ID
 **/
export const getAsetById = async (id) =>
  db("master_aset_sekolah").where({ ID: id }).first();

/**
 * Create new aset sekolah
 **/
export const createAset = async ({
  NAMA_BARANG,
  MERK_TYPE,
  JUMLAH_BARANG,
  ASAL_USUL_PEROLEHAN,
  PERIODE,
  KETERANGAN,
}) => {
  const [id] = await db("master_aset_sekolah").insert({
    NAMA_BARANG,
    MERK_TYPE,
    JUMLAH_BARANG,
    ASAL_USUL_PEROLEHAN,
    PERIODE,
    KETERANGAN,
  });

  return db("master_aset_sekolah").where({ ID: id }).first();
};

/**
 * Update aset sekolah
 **/
export const updateAset = async (
  id,
  { NAMA_BARANG, MERK_TYPE, JUMLAH_BARANG, ASAL_USUL_PEROLEHAN, PERIODE, KETERANGAN }
) => {
  await db("master_aset_sekolah")
    .where({ ID: id })
    .update({
      NAMA_BARANG,
      MERK_TYPE,
      JUMLAH_BARANG,
      ASAL_USUL_PEROLEHAN,
      PERIODE,
      KETERANGAN,
    });

  return db("master_aset_sekolah").where({ ID: id }).first();
};

/**
 * Delete aset sekolah
 **/
export const deleteAset = async (id) =>
  db("master_aset_sekolah").where({ ID: id }).del();
