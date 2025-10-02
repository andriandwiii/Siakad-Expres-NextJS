// models/presensiModel.js
import { db } from "../core/config/knex.js";

export const getPresensiByAbsensi = (absensi_id) => {
  return db("presensi_siswa").where({ absensi_id });
};

export const addPresensi = (data) => {
  return db("presensi_siswa").insert(data).returning("*");
};

export const updatePresensi = (id, data) => {
  return db("presensi_siswa").where({ id }).update(data).returning("*");
};

export const deletePresensi = (id) => {
  return db("presensi_siswa").where({ id }).del();
};
