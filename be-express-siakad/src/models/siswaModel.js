import { db } from "../core/config/knex.js";

/**
 * Get all siswa
 **/
export const getAllSiswa = async () => db("master_siswa").select("*");

/**
 * Get siswa by ID
 **/
export const getSiswaById = async (id) =>
  db("master_siswa").where({ SISWA_ID: id }).first();

/**
 * Get siswa by NIS
 **/
export const getSiswaByNis = async (nis) =>
  db("master_siswa").where({ NIS: nis }).first();

/**
 * Create new siswa
 **/
export const addSiswa = async ({
  NIS,
  NISN,
  NAMA,
  GENDER,
  TGL_LAHIR,
  STATUS,
  EMAIL,
}) => {
  const [id] = await db("master_siswa").insert({
    NIS,
    NISN,
    NAMA,
    GENDER,
    TGL_LAHIR,
    STATUS,
    EMAIL,
  });
  return db("master_siswa").where({ SISWA_ID: id }).first();
};

/**
 * Update siswa
 **/
export const updateSiswa = async (
  id,
  { NIS, NISN, NAMA, GENDER, TGL_LAHIR, STATUS, EMAIL }
) => {
  await db("master_siswa")
    .where({ SISWA_ID: id })
    .update({ NIS, NISN, NAMA, GENDER, TGL_LAHIR, STATUS, EMAIL });
  return db("master_siswa").where({ SISWA_ID: id }).first();
};

/**
 * Delete siswa
 **/
export const deleteSiswa = async (id) =>
  db("master_siswa").where({ SISWA_ID: id }).del();
