import express from "express";
import { registerHealthCareDetails, approveHealthCare } from "../Controllers/healthCareController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/details", authMiddleware, registerHealthCareDetails);
router.post("/approve", approveHealthCare); // Admin-only route (add admin middleware if needed)

export default router;