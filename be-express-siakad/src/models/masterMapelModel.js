// src/models/masterMapelModel.js
import { db } from "../core/config/knex.js";

/**
 * Ambil semua mapel
 */
export const getAllMapel = async () => {
  return db("master_mapel").select("*");
};

/**
 * Ambil mapel berdasarkan ID
 */
export const getMapelById = async (id) => {
  return db("master_mapel").where({ MAPEL_ID: id }).first();
};

/**
 * Ambil mapel berdasarkan kode
 */
export const getMapelByKode = async (kode) => {
  return db("master_mapel").where({ KODE_MAPEL: kode }).first();
};

/**
 * Tambah mapel baru
 */
export const createMapel = async ({
  KODE_MAPEL,
  NAMA_MAPEL,
  KATEGORI,
  DESKRIPSI, // ✅ tambahin
  STATUS,
}) => {
  const [id] = await db("master_mapel").insert({
    KODE_MAPEL,
    NAMA_MAPEL,
    KATEGORI,
    DESKRIPSI, // ✅ ikut disimpan
    STATUS,
  });

  return db("master_mapel").where({ MAPEL_ID: id }).first();
};

/**
 * Update mapel berdasarkan ID
 */
export const updateMapel = async (
  id,
  { KODE_MAPEL, NAMA_MAPEL, KATEGORI, DESKRIPSI, STATUS } // ✅ tambahin
) => {
  await db("master_mapel")
    .where({ MAPEL_ID: id })
    .update({
      KODE_MAPEL,
      NAMA_MAPEL,
      KATEGORI,
      DESKRIPSI, // ✅ ikut disimpan
      STATUS,
    });

  return db("master_mapel").where({ MAPEL_ID: id }).first();
};

/**
 * Hapus mapel berdasarkan ID
 */
export const deleteMapel = async (id) => {
  return db("master_mapel").where({ MAPEL_ID: id }).del();
};
