import express from "express";
import { registerUser, loginUser, getCurrentUser, upload } from "../controllers/userController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", upload.single("certificate"), registerUser); 
router.post("/login", loginUser);
router.get("/me", authMiddleware, getCurrentUser);

export default router;
