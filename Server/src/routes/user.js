import { Router } from "express";
import {loginUser, logoutUser, registerUser, getCurrentUser } from "../controllers/user.js";
import { verifyUserJwtToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signin", loginUser);
router.get('/logout', verifyUserJwtToken, logoutUser);
router.post("/signup", registerUser);
router.get("/profile", verifyUserJwtToken,  getCurrentUser)

export default router; 