import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
// Refresh Token
router.post("/refresh-token", AuthController.refreshToken);
export default router;
