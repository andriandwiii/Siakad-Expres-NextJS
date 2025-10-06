import express from "express";
import * as MasterJurusanController from "../controllers/masterJurusanController.js";

const router = express.Router();

// Semua pakai prefix /master-jurusan
router.get("/", MasterJurusanController.getAllJurusan);
router.get("/:id", MasterJurusanController.getJurusanById);
router.post("/", MasterJurusanController.createJurusan);
router.put("/:id", MasterJurusanController.updateJurusan);
router.delete("/:id", MasterJurusanController.deleteJurusan);

export default router;
