import express from "express";
import { getHealthCareDetails } from "../Controllers/healthCareController.js"; 
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/details", authMiddleware, getHealthCareDetails); 

export default router;