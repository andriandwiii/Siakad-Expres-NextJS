import { db } from "../core/config/knex.js";

/**
 * Get all mapel
 **/
export const getAllMapel = async () => db("mapel").select("*");

/**
 * Get mapel by ID
 **/
export const getMapelById = async (id) =>
  db("mapel").where({ MAPEL_ID: id }).first();

/**
 * Get mapel by kode
 **/
export const getMapelByKode = async (kode) =>
  db("mapel").where({ KODE_MAPEL: kode }).first();

/**
 * Create new mapel
 **/
export const createMapel = async ({
  KODE_MAPEL,
  NAMA_MAPEL,
  KATEGORI,
  STATUS,
}) => {
  const [id] = await db("mapel").insert({
    KODE_MAPEL,
    NAMA_MAPEL,
    KATEGORI,
    STATUS,
  });
  return db("mapel").where({ MAPEL_ID: id }).first();
};

/**
 * Update mapel
 **/
export const updateMapel = async (
  id,
  { KODE_MAPEL, NAMA_MAPEL, KATEGORI, STATUS }
) => {
  await db("mapel")
    .where({ MAPEL_ID: id })
    .update({ KODE_MAPEL, NAMA_MAPEL, KATEGORI, STATUS });
  return db("mapel").where({ MAPEL_ID: id }).first();
};

/**
 * Delete mapel
 **/
export const deleteMapel = async (id) =>
  db("mapel").where({ MAPEL_ID: id }).del();
