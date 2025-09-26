
import * as MasterGuruModel from "../models/masterGuruModel.js";

/**
 * Ambil semua data guru
 */
export const getAllGuru = async (req, res) => {
  try {
    const guru = await MasterGuruModel.getAllGuru();
    res.status(200).json(guru);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Ambil guru berdasarkan ID
 */
export const getGuruById = async (req, res) => {
  try {
    const guru = await MasterGuruModel.getGuruById(req.params.id);
    if (!guru) {
      return res.status(404).json({ message: "Guru tidak ditemukan" });
    }
    res.status(200).json(guru);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Tambah guru baru
 */
export const createGuru = async (req, res) => {
  try {
    const { NIP, NAMA, GELAR, PANGKAT, JABATAN } = req.body;

    if (!NIP || !NAMA) {
      return res.status(400).json({ message: "NIP dan NAMA wajib diisi" });
    }

    const newGuru = await MasterGuruModel.createGuru({
      NIP,
      NAMA,
      GELAR,
      PANGKAT,
      JABATAN,
    });

    res.status(201).json(newGuru);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update guru berdasarkan ID
 */
export const updateGuru = async (req, res) => {
  try {
    const { NIP, NAMA, GELAR, PANGKAT, JABATAN } = req.body;

    const updatedGuru = await MasterGuruModel.updateGuru(req.params.id, {
      NIP,
      NAMA,
      GELAR,
      PANGKAT,
      JABATAN,
    });

    if (!updatedGuru) {
      return res.status(404).json({ message: "Guru tidak ditemukan" });
    }

    res.status(200).json(updatedGuru);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Hapus guru berdasarkan ID
 */
export const deleteGuru = async (req, res) => {
  try {
    const deleted = await MasterGuruModel.deleteGuru(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Guru tidak ditemukan" });
    }

    res.status(200).json({ message: "Guru berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
