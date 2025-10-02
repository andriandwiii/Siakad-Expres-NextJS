import { Router } from "express";
import * as AbsensiController from "../controllers/absensiController.js";

const router = Router();

// GET all absensi + guru
router.get("/", AbsensiController.getAllAbsensi);

// GET absensi by ID
router.get("/:id", AbsensiController.getAbsensiById);

// POST new absensi
router.post("/", AbsensiController.addAbsensi);

// PUT update absensi
router.put("/:id", AbsensiController.updateAbsensi);

// DELETE absensi
router.delete("/:id", AbsensiController.deleteAbsensi);

export default router;
