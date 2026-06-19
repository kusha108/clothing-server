import express from "express";
import { getFashionData } from "../controller/fashion-controller.js";

const router = express.Router();

router.get("/fashion", getFashionData);

export default router;
