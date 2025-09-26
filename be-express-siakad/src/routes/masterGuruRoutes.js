
import { Router } from "express";
import * as MasterGuruController from "../controllers/masterGuruController.js";

const router = Router();

// GET all guru
router.get("/", MasterGuruController.getAllGuru);

// GET guru by ID
router.get("/:id", MasterGuruController.getGuruById);

// POST new guru
router.post("/", MasterGuruController.createGuru);

// PUT update guru
router.put("/:id", MasterGuruController.updateGuru);

// DELETE guru
router.delete("/:id", MasterGuruController.deleteGuru);

export default router;