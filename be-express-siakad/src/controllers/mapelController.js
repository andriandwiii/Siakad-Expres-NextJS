import * as MapelModel from "../models/mapelModel.js";

/**
 * Ambil semua data mapel
 */
export const getAllMapel = async (req, res) => {
  try {
    const mapel = await MapelModel.getAllMapel();
    res.status(200).json(mapel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Ambil mapel berdasarkan ID
 */
export const getMapelById = async (req, res) => {
  try {
    const mapel = await MapelModel.getMapelById(req.params.id);
    if (!mapel) {
      return res.status(404).json({ message: "Mapel tidak ditemukan" });
    }
    res.status(200).json(mapel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Tambah mapel baru
 */
export const createMapel = async (req, res) => {
  try {
    const { KODE_MAPEL, NAMA_MAPEL, KATEGORI, STATUS } = req.body;

    if (!KODE_MAPEL || !NAMA_MAPEL) {
      return res
        .status(400)
        .json({ message: "KODE_MAPEL dan NAMA_MAPEL wajib diisi" });
    }

    const newMapel = await MapelModel.createMapel({
      KODE_MAPEL,
      NAMA_MAPEL,
      KATEGORI,
      STATUS,
    });

    res.status(201).json(newMapel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update mapel berdasarkan ID
 */
export const updateMapel = async (req, res) => {
  try {
    const { KODE_MAPEL, NAMA_MAPEL, KATEGORI, STATUS } = req.body;

    const updatedMapel = await MapelModel.updateMapel(req.params.id, {
      KODE_MAPEL,
      NAMA_MAPEL,
      KATEGORI,
      STATUS,
    });

    if (!updatedMapel) {
      return res.status(404).json({ message: "Mapel tidak ditemukan" });
    }

    res.status(200).json(updatedMapel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Hapus mapel berdasarkan ID
 */
export const deleteMapel = async (req, res) => {
  try {
    const deleted = await MapelModel.deleteMapel(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Mapel tidak ditemukan" });
    }

    res.status(200).json({ message: "Mapel berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
