import { Router } from "express";
import * as InformasiSekolahController from "../controllers/informasiSekolahController.js";

const router = Router();

router.get("/", InformasiSekolahController.getAllInformasiSekolah);
router.get("/:id", InformasiSekolahController.getInformasiSekolahById);
router.post("/", InformasiSekolahController.createInformasiSekolah);
router.put("/:id", InformasiSekolahController.updateInformasiSekolah);
router.delete("/:id", InformasiSekolahController.deleteInformasiSekolah);

export default router;
