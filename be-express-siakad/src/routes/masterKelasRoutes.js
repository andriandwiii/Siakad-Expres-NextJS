import express from "express";
import * as KelasController from "../controllers/kelasController.js";

const router = express.Router();

// GET semua kelas
router.get("/", KelasController.getAllKelas);

// GET kelas berdasarkan ID
router.get("/:id", KelasController.getKelasById);

// POST tambah kelas baru
router.post("/", KelasController.createKelas);

// PUT update kelas berdasarkan ID
router.put("/:id", KelasController.updateKelas);

// DELETE hapus kelas berdasarkan ID
router.delete("/:id", KelasController.deleteKelas);

export default router;
