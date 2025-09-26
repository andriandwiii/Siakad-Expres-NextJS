import { db } from "../core/config/knex.js";

/**
 * Get all kelas
 **/
export const getAllKelas = async () => db("master_kelas").select("*");

/**
 * Get kelas by ID
 **/
export const getKelasById = async (id) =>
  db("master_kelas").where({ KELAS_ID: id }).first();

/**
 * Get kelas by kode
 **/
export const getKelasByKode = async (kode) =>
  db("master_kelas").where({ KODE_KELAS: kode }).first();

/**
 * Create new kelas
 **/
export const createKelas = async ({
  KODE_KELAS,
  TINGKAT,
  JURUSAN,
  NAMA_KELAS,
  STATUS,
}) => {
  const [id] = await db("master_kelas").insert({
    KODE_KELAS,
    TINGKAT,
    JURUSAN,
    NAMA_KELAS,
    STATUS,
  });
  return db("master_kelas").where({ KELAS_ID: id }).first();
};

/**
 * Update kelas
 **/
export const updateKelas = async (
  id,
  { KODE_KELAS, TINGKAT, JURUSAN, NAMA_KELAS, STATUS }
) => {
  await db("master_kelas")
    .where({ KELAS_ID: id })
    .update({ KODE_KELAS, TINGKAT, JURUSAN, NAMA_KELAS, STATUS });
  return db("master_kelas").where({ KELAS_ID: id }).first();
};

/**
 * Delete kelas
 **/
export const deleteKelas = async (id) =>
  db("master_kelas").where({ KELAS_ID: id }).del();
