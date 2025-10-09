import * as GedungModel from "../models/gedungModel.js";

/**
 * Ambil semua gedung
 */
export const getAllGedung = async (req, res) => {
  try {
    const gedung = await GedungModel.getAllGedung();
    res.status(200).json({ status: "success", data: gedung });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

/**
 * Ambil gedung berdasarkan ID
 */
export const getGedungById = async (req, res) => {
  try {
    const gedung = await GedungModel.getGedungById(req.params.id);

    if (!gedung) {
      return res.status(404).json({ status: "error", message: "Gedung tidak ditemukan" });
    }

    res.status(200).json({ status: "success", data: gedung });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

/**
 * Tambah gedung baru
 */
export const createGedung = async (req, res) => {
  try {
    const { NAMA_GEDUNG, LOKASI } = req.body;

    if (!NAMA_GEDUNG) {
      return res.status(400).json({ status: "error", message: "NAMA_GEDUNG wajib diisi" });
    }

    const newGedung = await GedungModel.createGedung({ NAMA_GEDUNG, LOKASI });
    res.status(201).json({ status: "success", data: newGedung });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

/**
 * Update gedung berdasarkan ID
 */
export const updateGedung = async (req, res) => {
  try {
    const { NAMA_GEDUNG, LOKASI } = req.body;

    const updatedGedung = await GedungModel.updateGedung(req.params.id, { NAMA_GEDUNG, LOKASI });

    if (!updatedGedung) {
      return res.status(404).json({ status: "error", message: "Gedung tidak ditemukan" });
    }

    res.status(200).json({ status: "success", data: updatedGedung });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

/**
 * Hapus gedung berdasarkan ID
 */
export const deleteGedung = async (req, res) => {
  try {
    const deleted = await GedungModel.deleteGedung(req.params.id);

    if (!deleted) {
      return res.status(404).json({ status: "error", message: "Gedung tidak ditemukan" });
    }

    res.status(200).json({ status: "success", message: "Gedung berhasil dihapus", data: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};
