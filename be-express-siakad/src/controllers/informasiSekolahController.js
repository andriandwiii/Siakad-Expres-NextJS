// src/controllers/informasiSekolahController.js
import * as InformasiSekolahModel from "../models/informasiSekolahModel.js";

const validStatus = ["Aktif", "Tidak Aktif"];

/**
 * GET semua informasi sekolah
 */
export const getAllInformasiSekolah = async (req, res) => {
  try {
    const data = await InformasiSekolahModel.getAllInformasiSekolah();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error getAllInformasiSekolah:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET informasi sekolah berdasarkan ID
 */
export const getInformasiSekolahById = async (req, res) => {
  try {
    const data = await InformasiSekolahModel.getInformasiSekolahById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Informasi sekolah tidak ditemukan" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error("Error getInformasiSekolahById:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST tambah informasi sekolah
 */
export const createInformasiSekolah = async (req, res) => {
  try {
    const { NAMA_SEKOLAH, ALAMAT, JENJANG_AKREDITASI, TANGGAL_AKREDITASI, NPSN, STATUS } = req.body;

    // Validasi dasar
    if (!NAMA_SEKOLAH || !ALAMAT || !NPSN) {
      return res.status(400).json({ message: "NAMA_SEKOLAH, ALAMAT, dan NPSN wajib diisi" });
    }

    // Validasi status
    const finalStatus = validStatus.includes(STATUS) ? STATUS : "Aktif";

    const newData = await InformasiSekolahModel.createInformasiSekolah({
      NAMA_SEKOLAH,
      ALAMAT,
      JENJANG_AKREDITASI,
      TANGGAL_AKREDITASI,
      NPSN,
      STATUS: finalStatus,
    });

    res.status(201).json(newData);
  } catch (err) {
    console.error("Error createInformasiSekolah:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT update informasi sekolah
 */
export const updateInformasiSekolah = async (req, res) => {
  try {
    const { NAMA_SEKOLAH, ALAMAT, JENJANG_AKREDITASI, TANGGAL_AKREDITASI, NPSN, STATUS } = req.body;

    // Validasi status
    const finalStatus = validStatus.includes(STATUS) ? STATUS : "Aktif";

    // Cek dulu apakah data ada
    const existing = await InformasiSekolahModel.getInformasiSekolahById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Informasi sekolah tidak ditemukan" });
    }

    const updated = await InformasiSekolahModel.updateInformasiSekolah(req.params.id, {
      NAMA_SEKOLAH,
      ALAMAT,
      JENJANG_AKREDITASI,
      TANGGAL_AKREDITASI,
      NPSN,
      STATUS: finalStatus,
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updateInformasiSekolah:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE informasi sekolah
 */
export const deleteInformasiSekolah = async (req, res) => {
  try {
    // Cek dulu apakah ada datanya
    const existing = await InformasiSekolahModel.getInformasiSekolahById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Informasi sekolah tidak ditemukan" });
    }

    await InformasiSekolahModel.deleteInformasiSekolah(req.params.id);
    res.status(200).json({ message: "Informasi sekolah berhasil dihapus" });
  } catch (err) {
    console.error("Error deleteInformasiSekolah:", err);
    res.status(500).json({ error: err.message });
  }
};
