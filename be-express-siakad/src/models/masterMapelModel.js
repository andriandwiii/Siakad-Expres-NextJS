import { db } from "../core/config/knex.js";

/**
 * Ambil semua mata pelajaran
 **/
export const getAllMapel = async () => db("master_mata_pelajaran").select("*");

/**
 * Ambil mata pelajaran berdasarkan ID
 **/
export const getMapelById = async (id) =>
  db("master_mata_pelajaran").where({ MAPEL_ID: id }).first();

/**
 * Ambil mata pelajaran berdasarkan kode
 **/
export const getMapelByKode = async (kode) =>
  db("master_mata_pelajaran").where({ KODE_MAPEL: kode }).first();

/**
 * Tambah mata pelajaran baru
 **/
export const createMapel = async ({
  KODE_MAPEL,
  NAMA_MAPEL,
  KATEGORI,
  STATUS,
}) => {
  const [id] = await db("master_mata_pelajaran").insert({
    KODE_MAPEL,
    NAMA_MAPEL,
    KATEGORI,
    STATUS,
  });
  return db("master_mata_pelajaran").where({ MAPEL_ID: id }).first();
};

/**
 * Update mata pelajaran
 **/
export const updateMapel = async (
  id,
  { KODE_MAPEL, NAMA_MAPEL, KATEGORI, STATUS }
) => {
  await db("master_mata_pelajaran")
    .where({ MAPEL_ID: id })
    .update({ KODE_MAPEL, NAMA_MAPEL, KATEGORI, STATUS });
  return db("master_mata_pelajaran").where({ MAPEL_ID: id }).first();
};

/**
 * Hapus mata pelajaran
 **/
export const deleteMapel = async (id) =>
  db("master_mata_pelajaran").where({ MAPEL_ID: id }).del();
