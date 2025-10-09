import * as KelasModel from "../models/kelasModel.js";

/**
 * Ambil semua kelas
 */
export const getAllKelas = async (req, res) => {
  try {
    const kelas = await KelasModel.getAllKelas();
    res.status(200).json({ status: "success", data: kelas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

/**
 * Ambil kelas berdasarkan ID
 */
export const getKelasById = async (req, res) => {
  try {
    const kelas = await KelasModel.getKelasById(req.params.id);
    if (!kelas) {
      return res.status(404).json({ status: "error", message: "Kelas tidak ditemukan" });
    }
    res.status(200).json({ status: "success", data: kelas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

/**
 * Tambah kelas baru
 */
export const createKelas = async (req, res) => {
  try {
    const { NAMA_KELAS, JURUSAN_ID, GEDUNG_ID, TINGKATAN } = req.body;

    if (!NAMA_KELAS || !JURUSAN_ID || !GEDUNG_ID) {
      return res.status(400).json({ status: "error", message: "NAMA_KELAS, JURUSAN_ID dan GEDUNG_ID wajib diisi" });
    }

    const newKelas = await KelasModel.createKelas({ NAMA_KELAS, JURUSAN_ID, GEDUNG_ID, TINGKATAN });
    res.status(201).json({ status: "success", data: newKelas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

/**
 * Update kelas berdasarkan ID
 */
export const updateKelas = async (req, res) => {
  try {
    const { NAMA_KELAS, JURUSAN_ID, GEDUNG_ID, TINGKATAN } = req.body;

    const updatedKelas = await KelasModel.updateKelas(req.params.id, { NAMA_KELAS, JURUSAN_ID, GEDUNG_ID, TINGKATAN });

    if (!updatedKelas) {
      return res.status(404).json({ status: "error", message: "Kelas tidak ditemukan" });
    }

    res.status(200).json({ status: "success", data: updatedKelas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

/**
 * Hapus kelas berdasarkan ID
 */
export const deleteKelas = async (req, res) => {
  try {
    const deleted = await KelasModel.deleteKelas(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: "error", message: "Kelas tidak ditemukan" });
    }
    res.status(200).json({ status: "success", message: "Kelas berhasil dihapus", data: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};
