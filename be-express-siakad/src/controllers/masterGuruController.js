<<<<<<< HEAD
import * as MasterWilayahModel from "../models/masterWilayahModel.js";

/**
 * Ambil semua data wilayah
 */
export const getAllWilayah = async (req, res) => {
  try {
    const wilayah = await MasterWilayahModel.getAllWilayah();
    res.status(200).json(wilayah);
=======
import * as GuruModel from "../models/guruModel.js";

// Ambil semua guru
export const getAllGuru = async (req, res) => {
  try {
    const data = await GuruModel.getAllGuruWithUser();
    res.json({ status: "00", message: "Data guru ditemukan", data });
>>>>>>> 85d5a36d030c05121d3dbcd4a8dc0b44af86b7dd
  } catch (err) {
    res.status(500).json({ status: "01", message: err.message });
  }
};

<<<<<<< HEAD
/**
 * Ambil wilayah berdasarkan ID
 */
export const getWilayahById = async (req, res) => {
  try {
    const wilayah = await MasterWilayahModel.getWilayahById(req.params.id);
    if (!wilayah) {
      return res.status(404).json({ message: "Wilayah tidak ditemukan" });
    }
    res.status(200).json(wilayah);
=======
// Ambil guru by ID
export const getGuruById = async (req, res) => {
  try {
    const data = await GuruModel.getGuruByIdWithUser(req.params.id);
    if (!data) {
      return res.status(404).json({ status: "01", message: "Guru tidak ditemukan" });
    }
    res.json({ status: "00", message: "Data guru ditemukan", data });
>>>>>>> 85d5a36d030c05121d3dbcd4a8dc0b44af86b7dd
  } catch (err) {
    res.status(500).json({ status: "01", message: err.message });
  }
};

<<<<<<< HEAD
/**
 * Tambah wilayah baru
 */
export const createWilayah = async (req, res) => {
  try {
    const { PROVINSI, KABUPATEN, KECAMATAN, DESA_KELURAHAN, KODEPOS, RT, RW, JALAN } = req.body;

    if (!PROVINSI || !KABUPATEN || !KECAMATAN) {
      return res.status(400).json({ message: "PROVINSI, KABUPATEN, dan KECAMATAN wajib diisi" });
    }

    const newWilayah = await MasterWilayahModel.createWilayah({
      PROVINSI,
      KABUPATEN,
      KECAMATAN,
      DESA_KELURAHAN,
      KODEPOS,
      RT,
      RW,
      JALAN,
    });

    res.status(201).json(newWilayah);
=======
// Tambah guru
export const createGuru = async (req, res) => {
  try {
    const guru = await GuruModel.addGuru(req.body);
    res.json({ status: "00", message: "Guru berhasil ditambahkan", guru });
>>>>>>> 85d5a36d030c05121d3dbcd4a8dc0b44af86b7dd
  } catch (err) {
    res.status(500).json({ status: "01", message: err.message });
  }
};

<<<<<<< HEAD
/**
 * Update wilayah berdasarkan ID
 */
export const updateWilayah = async (req, res) => {
  try {
    const { PROVINSI, KABUPATEN, KECAMATAN, DESA_KELURAHAN, KODEPOS, RT, RW, JALAN } = req.body;

    const updatedWilayah = await MasterWilayahModel.updateWilayah(req.params.id, {
      PROVINSI,
      KABUPATEN,
      KECAMATAN,
      DESA_KELURAHAN,
      KODEPOS,
      RT,
      RW,
      JALAN,
    });

    if (!updatedWilayah) {
      return res.status(404).json({ message: "Wilayah tidak ditemukan" });
    }

    res.status(200).json(updatedWilayah);
=======
// Update guru
export const updateGuru = async (req, res) => {
  try {
    const guru = await GuruModel.updateGuru(req.params.id, req.body);
    res.json({ status: "00", message: "Guru berhasil diperbarui", guru });
>>>>>>> 85d5a36d030c05121d3dbcd4a8dc0b44af86b7dd
  } catch (err) {
    res.status(500).json({ status: "01", message: err.message });
  }
};

<<<<<<< HEAD
/**
 * Hapus wilayah berdasarkan ID
 */
export const deleteWilayah = async (req, res) => {
  try {
    const deleted = await MasterWilayahModel.deleteWilayah(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Wilayah tidak ditemukan" });
    }

    res.status(200).json({ message: "Wilayah berhasil dihapus" });
=======
// Hapus guru
export const deleteGuru = async (req, res) => {
  try {
    await GuruModel.deleteGuru(req.params.id);
    res.json({ status: "00", message: "Guru berhasil dihapus" });
>>>>>>> 85d5a36d030c05121d3dbcd4a8dc0b44af86b7dd
  } catch (err) {
    res.status(500).json({ status: "01", message: err.message });
  }
};
