import cors from "cors";
import express from "express";
import logger from "morgan";

import { setResponseHeader } from "./middleware/set-headers.js";
import authRoutes from "./routes/authRoutes.js";
import siswaRoutes from "./routes/siswaRoutes.js";
import kelasRoutes from "./routes/kelasRoutes.js";
import masterGuruRoutes from "./routes/masterGuruRoutes.js";
import mapelRoutes from "./routes/mapelRoutes.js";
import masterKurikulumRoutes from "./routes/masterKurikulumRoutes.js";
import masterAgamaRoutes from "./routes/masterAgamaRoutes.js";
import informasiSekolahRoutes from "./routes/informasiSekolahRoutes.js";
import masterMapelRoutes from "./routes/masterMapelRoutes.js";
import masterAsetSekolahRoutes from "./routes/masterAsetSekolahRoutes.js";
import dashboardRoutes from './routes/dashboardRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import masterKelasRoutes from "./routes/masterKelasRoutes.js";

const app = express();

const allowedOrigins = ["http://localhost:3000"];

// CORS middleware configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Timestamp",
      "X-Signature",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionSuccessStatus: 200,
  })
);

// Use morgan logger and set response headers
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Root endpoint
app.get("/", [setResponseHeader], (req, res) => {
  return res.status(200).json(`Welcome to the server! ${new Date().toLocaleString()}`);
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/siswa", siswaRoutes);
app.use("/api/kelas", kelasRoutes);
app.use("/api/guru", masterGuruRoutes);
app.use("/api/mapel", mapelRoutes);
app.use("/api/kurikulum", masterKurikulumRoutes);
app.use("/api/agama", masterAgamaRoutes);
app.use("/api/informasi-sekolah", informasiSekolahRoutes);
app.use("/api/master-mapel", masterMapelRoutes);
app.use("/api/master-aset-sekolah", masterAsetSekolahRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/master-kelas", masterKelasRoutes);
app.use("/api/master-guru", masterGuruRoutes); 

export default app;
