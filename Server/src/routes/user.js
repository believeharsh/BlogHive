import { Router } from "express";
import {loginUser, logoutUser, registerUser } from "../controllers/user.js";
import { verifyUserJwtToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signin", loginUser);
router.get('/logout', verifyUserJwtToken, logoutUser);
router.post("/signup", registerUser);

export default router; 