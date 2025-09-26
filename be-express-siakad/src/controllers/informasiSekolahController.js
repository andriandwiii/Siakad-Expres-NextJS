import * as InformasiSekolahModel from "../models/informasiSekolahModel.js";

/**
 * GET semua informasi sekolah
 */
export const getAllInformasiSekolah = async (req, res) => {
  try {
    const data = await InformasiSekolahModel.getAllInformasiSekolah();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET informasi sekolah berdasarkan ID
 */
export const getInformasiSekolahById = async (req, res) => {
  try {
    const data = await InformasiSekolahModel.getInformasiSekolahById(req.params.id);
    if (!data) return res.status(404).json({ message: "Informasi sekolah tidak ditemukan" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST tambah informasi sekolah
 */
export const createInformasiSekolah = async (req, res) => {
  try {
    const { NAMA_SEKOLAH, ALAMAT, JENJANG_AKREDITASI, TANGGAL_AKREDITASI, NPSN, STATUS } = req.body;

    if (!NAMA_SEKOLAH || !ALAMAT) {
      return res.status(400).json({ message: "NAMA_SEKOLAH dan ALAMAT wajib diisi" });
    }

    const newData = await InformasiSekolahModel.createInformasiSekolah({
      NAMA_SEKOLAH,
      ALAMAT,
      JENJANG_AKREDITASI,
      TANGGAL_AKREDITASI,
      NPSN,
      STATUS: STATUS || "Aktif",
    });

    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT update informasi sekolah
 */
export const updateInformasiSekolah = async (req, res) => {
  try {
    const { NAMA_SEKOLAH, ALAMAT, JENJANG_AKREDITASI, TANGGAL_AKREDITASI, NPSN, STATUS } = req.body;

    const updated = await InformasiSekolahModel.updateInformasiSekolah(req.params.id, {
      NAMA_SEKOLAH,
      ALAMAT,
      JENJANG_AKREDITASI,
      TANGGAL_AKREDITASI,
      NPSN,
      STATUS,
    });

    if (!updated) return res.status(404).json({ message: "Informasi sekolah tidak ditemukan" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE informasi sekolah
 */
export const deleteInformasiSekolah = async (req, res) => {
  try {
    const deleted = await InformasiSekolahModel.deleteInformasiSekolah(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Informasi sekolah tidak ditemukan" });

    res.status(200).json({ message: "Informasi sekolah berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
