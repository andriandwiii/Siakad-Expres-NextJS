const Absensi = require('../models/absensiModel');

exports.getAllAbsensi = async (req, res) => {
  try {
    const data = await Absensi.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAbsensi = async (req, res) => {
  try {
    const newAbsensi = await Absensi.create(req.body);
    res.status(201).json(newAbsensi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
