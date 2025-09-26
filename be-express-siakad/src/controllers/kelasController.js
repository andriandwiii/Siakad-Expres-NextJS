import * as KelasModel from "../models/kelasModel.js";

/**
 * Ambil semua data kelas
 */
export const getAllKelas = async (req, res) => {
  try {
    const kelas = await KelasModel.getAllKelas();
    res.status(200).json(kelas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Ambil kelas berdasarkan ID
 */
export const getKelasById = async (req, res) => {
  try {
    const kelas = await KelasModel.getKelasById(req.params.id);
    if (!kelas) {
      return res.status(404).json({ message: "Kelas tidak ditemukan" });
    }
    res.status(200).json(kelas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Tambah kelas baru
 */
export const createKelas = async (req, res) => {
  try {
    const { KODE_KELAS, TINGKAT, JURUSAN, NAMA_KELAS, STATUS } = req.body;

    // Validasi sederhana
    if (!KODE_KELAS || !NAMA_KELAS) {
      return res.status(400).json({ message: "KODE_KELAS dan NAMA_KELAS wajib diisi" });
    }

    const newKelas = await KelasModel.createKelas({
      KODE_KELAS,
      TINGKAT,
      JURUSAN,
      NAMA_KELAS,
      STATUS,
    });

    res.status(201).json(newKelas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update kelas berdasarkan ID
 */
export const updateKelas = async (req, res) => {
  try {
    const { KODE_KELAS, TINGKAT, JURUSAN, NAMA_KELAS, STATUS } = req.body;

    const updatedKelas = await KelasModel.updateKelas(req.params.id, {
      KODE_KELAS,
      TINGKAT,
      JURUSAN,
      NAMA_KELAS,
      STATUS,
    });

    if (!updatedKelas) {
      return res.status(404).json({ message: "Kelas tidak ditemukan" });
    }

    res.status(200).json(updatedKelas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Hapus kelas berdasarkan ID
 */
export const deleteKelas = async (req, res) => {
  try {
    const deleted = await KelasModel.deleteKelas(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Kelas tidak ditemukan" });
    }

    res.status(200).json({ message: "Kelas berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
