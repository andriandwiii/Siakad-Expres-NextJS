import express from "express";
import {
  fetchAllKelas,
  getKelasByIdController,
  createNewKelas,
  updateKelasController,
  deleteKelasController,
} from "../controllers/masterkelasController.js";

const router = express.Router();

// GET semua kelas
router.get("/", fetchAllKelas);

// GET kelas by ID
router.get("/:id", getKelasByIdController);

// POST tambah kelas
router.post("/", createNewKelas);

// PUT update kelas
router.put("/:id", updateKelasController);

// DELETE hapus kelas
router.delete("/:id", deleteKelasController);

export default router;
