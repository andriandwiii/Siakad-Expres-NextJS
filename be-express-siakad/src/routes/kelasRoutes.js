import { Router } from "express";
import * as KelasController from "../controllers/kelasController.js";

const router = Router();

// GET all kelas
router.get("/", KelasController.getAllKelas);

// GET kelas by ID
router.get("/:id", KelasController.getKelasById);

// POST new kelas
router.post("/", KelasController.createKelas);

// PUT update kelas
router.put("/:id", KelasController.updateKelas);

// DELETE kelas
router.delete("/:id", KelasController.deleteKelas);

export default router;
