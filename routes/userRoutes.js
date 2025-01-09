import express from "express";
import {
  registerUser,
  loginUser,
  getUsersByRole,
  refreshToken,
  logout,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/middleware.js";
import cookieParser from "cookie-parser";

const router = express.Router();

// Add cookie parser middleware
router.use(cookieParser());

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get Users by Role
router.get("/by-role/:role", authenticateToken, getUsersByRole);

router.post("/refresh-token", refreshToken);
router.post("/logout", authenticateToken, logout);

export default router;
