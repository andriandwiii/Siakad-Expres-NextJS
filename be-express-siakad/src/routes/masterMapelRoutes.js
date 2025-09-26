import { Router } from "express";
import * as MapelController from "../controllers/masterMapelController.js";

const router = Router();

// GET all mata pelajaran
router.get("/", MapelController.getAllMapel);

// GET mata pelajaran by ID
router.get("/:id", MapelController.getMapelById);

// POST new mata pelajaran
router.post("/", MapelController.createMapel);

// PUT update mata pelajaran
router.put("/:id", MapelController.updateMapel);

// DELETE mata pelajaran
router.delete("/:id", MapelController.deleteMapel);

export default router;
