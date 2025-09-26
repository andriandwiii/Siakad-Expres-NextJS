import * as MasterMapelModel from "../models/masterMapelModel.js";

/**
 * Ambil semua mata pelajaran
 */
export const getAllMapel = async (req, res) => {
  try {
    const mapel = await MasterMapelModel.getAllMapel();
    res.status(200).json(mapel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Ambil mata pelajaran berdasarkan ID
 */
export const getMapelById = async (req, res) => {
  try {
    const mapel = await MasterMapelModel.getMapelById(req.params.id);
    if (!mapel) {
      return res.status(404).json({ message: "Mata pelajaran tidak ditemukan" });
    }
    res.status(200).json(mapel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Tambah mata pelajaran baru
 */
export const createMapel = async (req, res) => {
  try {
    const { KODE_MAPEL, NAMA_MAPEL, KATEGORI, STATUS } = req.body;

    if (!KODE_MAPEL || !NAMA_MAPEL || !KATEGORI) {
      return res.status(400).json({ message: "KODE_MAPEL, NAMA_MAPEL, dan KATEGORI wajib diisi" });
    }

    const newMapel = await MasterMapelModel.createMapel({
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
 * Update mata pelajaran berdasarkan ID
 */
export const updateMapel = async (req, res) => {
  try {
    const { KODE_MAPEL, NAMA_MAPEL, KATEGORI, STATUS } = req.body;

    const updatedMapel = await MasterMapelModel.updateMapel(req.params.id, {
      KODE_MAPEL,
      NAMA_MAPEL,
      KATEGORI,
      STATUS,
    });

    if (!updatedMapel) {
      return res.status(404).json({ message: "Mata pelajaran tidak ditemukan" });
    }

    res.status(200).json(updatedMapel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Hapus mata pelajaran berdasarkan ID
 */
export const deleteMapel = async (req, res) => {
  try {
    const deleted = await MasterMapelModel.deleteMapel(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Mata pelajaran tidak ditemukan" });
    }

    res.status(200).json({ message: "Mata pelajaran berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
