import express from "express";
import * as MasterGedungController from "../controllers/masterGedungController.js";

const router = express.Router();

router.get("/", MasterGedungController.getAllGedung);
router.get("/:id", MasterGedungController.getGedungById);
router.post("/", MasterGedungController.createGedung);
router.put("/:id", MasterGedungController.updateGedung);
router.delete("/:id", MasterGedungController.deleteGedung);

export default router;
