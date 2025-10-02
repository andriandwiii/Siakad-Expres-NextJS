import * as SiswaModel from "../models/siswaModel.js"; 

// GET semua siswa
export const getAllSiswa = async (req, res) => {
  try {
    const siswa = await SiswaModel.getAllSiswaWithUser();
    res.status(200).json({
      status: "00",
      message: "Data siswa berhasil diambil",
      data: siswa,
    });
  } catch (err) {
    res.status(500).json({
      status: "99",
      message: "Terjadi kesalahan saat mengambil data siswa",
      error: err.message,
    });
  }
};

// GET siswa by ID
export const getSiswaById = async (req, res) => {
  try {
    const siswa = await SiswaModel.getSiswaByIdWithUser(req.params.id);
    if (!siswa) {
      return res.status(404).json({
        status: "04",
        message: "Siswa tidak ditemukan",
      });
    }
    res.status(200).json({
      status: "00",
      message: "Data siswa berhasil diambil",
      data: siswa,
    });
  } catch (err) {
    res.status(500).json({
      status: "99",
      message: "Terjadi kesalahan saat mengambil data siswa",
      error: err.message,
    });
  }
};

// ADD siswa baru
export const addSiswa = async (req, res) => {
  try {
    const { user_id, NIS, NISN, NAMA, GENDER, TGL_LAHIR, STATUS, EMAIL } = req.body;

    const newSiswa = await SiswaModel.addSiswa({
      user_id, // wajib ada relasi ke users
      NIS,
      NISN,
      NAMA,
      GENDER,
      TGL_LAHIR,
      STATUS,
      EMAIL,
    });

    res.status(201).json({
      status: "00",
      message: "Siswa berhasil ditambahkan",
      data: newSiswa,
    });
  } catch (err) {
    res.status(500).json({
      status: "99",
      message: "Terjadi kesalahan saat menambahkan siswa",
      error: err.message,
    });
  }
};

// UPDATE siswa
export const updateSiswa = async (req, res) => {
  try {
    const { NIS, NISN, NAMA, GENDER, TGL_LAHIR, STATUS, EMAIL } = req.body;

    const updatedSiswa = await SiswaModel.updateSiswa(req.params.id, {
      NIS,
      NISN,
      NAMA,
      GENDER,
      TGL_LAHIR,
      STATUS,
      EMAIL,
    });

    if (!updatedSiswa) {
      return res.status(404).json({
        status: "04",
        message: "Siswa tidak ditemukan untuk diperbarui",
      });
    }

    res.status(200).json({
      status: "00",
      message: "Siswa berhasil diperbarui",
      data: updatedSiswa,
    });
  } catch (err) {
    res.status(500).json({
      status: "99",
      message: "Terjadi kesalahan saat memperbarui data siswa",
      error: err.message,
    });
  }
};

// DELETE siswa
export const deleteSiswa = async (req, res) => {
  try {
    const siswa = await SiswaModel.getSiswaById(req.params.id);
    if (!siswa) {
      return res.status(404).json({
        status: "04",
        message: "Siswa tidak ditemukan untuk dihapus",
      });
    }

    await SiswaModel.deleteSiswa(req.params.id);
    res.status(200).json({
      status: "00",
      message: "Siswa berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      status: "99",
      message: "Terjadi kesalahan saat menghapus siswa",
      error: err.message,
    });
  }
};
