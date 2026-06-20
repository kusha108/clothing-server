

import express from "express";
import multer from "multer";
import { analyzeUserImage } from "../controller/aiController.js";

const router = express.Router();

// ✅ Multer setup
const upload = multer({ dest: "uploads/" });

// 🔥 FIX: change "image" → "file"
router.post("/analyze", upload.single("file"), analyzeUserImage);

export default router;