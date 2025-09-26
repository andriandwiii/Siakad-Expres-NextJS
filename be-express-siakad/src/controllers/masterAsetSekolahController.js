import * as MasterAsetSekolahModel from "../models/masterAsetSekolahModel.js";

/**
 * GET semua aset sekolah
 */
export const getAllAset = async (req, res) => {
  try {
    const data = await MasterAsetSekolahModel.getAllAset();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET aset sekolah berdasarkan ID
 */
export const getAsetById = async (req, res) => {
  try {
    const data = await MasterAsetSekolahModel.getAsetById(req.params.id);
    if (!data) return res.status(404).json({ message: "Aset sekolah tidak ditemukan" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST tambah aset sekolah
 */
export const createAset = async (req, res) => {
  try {
    const {
      NAMA_BARANG,
      MERK_TYPE,
      JUMLAH_BARANG,
      ASAL_USUL_PEROLEHAN,
      PERIODE,
      KETERANGAN,
      STATUS, // ✅ ikutkan status
    } = req.body;

    // Validasi input
    if (!NAMA_BARANG || !JUMLAH_BARANG) {
      return res.status(400).json({ message: "NAMA_BARANG dan JUMLAH_BARANG wajib diisi" });
    }

    // Buat data baru
    const newData = await MasterAsetSekolahModel.createAset({
      NAMA_BARANG,
      MERK_TYPE,
      JUMLAH_BARANG,
      ASAL_USUL_PEROLEHAN,
      PERIODE,
      KETERANGAN,
      STATUS, // ✅ ikutkan status
    });

    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT update aset sekolah
 */
export const updateAset = async (req, res) => {
  try {
    const {
      NAMA_BARANG,
      MERK_TYPE,
      JUMLAH_BARANG,
      ASAL_USUL_PEROLEHAN,
      PERIODE,
      KETERANGAN,
      STATUS, // ✅ ikutkan status
    } = req.body;

    // Validasi input status
    if (STATUS && !['Aktif', 'Tidak Aktif'].includes(STATUS)) {
      return res.status(400).json({ message: "Status harus 'Aktif' atau 'Tidak Aktif'" });
    }

    // Update data aset
    const updated = await MasterAsetSekolahModel.updateAset(req.params.id, {
      NAMA_BARANG,
      MERK_TYPE,
      JUMLAH_BARANG,
      ASAL_USUL_PEROLEHAN,
      PERIODE,
      KETERANGAN,
      STATUS, // ✅ ikutkan status
    });

    if (!updated) return res.status(404).json({ message: "Aset sekolah tidak ditemukan" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE aset sekolah
 */
export const deleteAset = async (req, res) => {
  try {
    const deleted = await MasterAsetSekolahModel.deleteAset(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Aset sekolah tidak ditemukan" });

    res.status(200).json({ message: "Aset sekolah berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
