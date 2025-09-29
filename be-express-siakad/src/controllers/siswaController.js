import * as SiswaModel from "../models/siswaModel.js";

export const getAllSiswa = async (req, res) => {
  try {
    const siswa = await SiswaModel.getAllSiswa();
    res.json(siswa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSiswaById = async (req, res) => {
  try {
    const siswa = await SiswaModel.getSiswaById(req.params.id);
    if (!siswa) return res.status(404).json({ message: "Siswa tidak ditemukan" });
    res.json(siswa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addSiswa = async (req, res) => {
  try {
    const { NIS, NISN, NAMA, GENDER, TGL_LAHIR, STATUS, EMAIL } = req.body;
    const newSiswa = await SiswaModel.addSiswa({
      NIS,
      NISN,
      NAMA,
      GENDER,
      TGL_LAHIR,
      STATUS,
      EMAIL,
    });
    res.status(201).json(newSiswa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
    res.json(updatedSiswa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSiswa = async (req, res) => {
  try {
    await SiswaModel.deleteSiswa(req.params.id);
    res.json({ message: "Siswa berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
