import { Router } from "express";
import { asyncHandler } from "../services/asyncHandler.js";
import { renderSignIn, renderSignUp, handleSignIn, handleLogout, handleSignUp } from "../controllers/user.js";

const router = Router();


router.get("/signin", asyncHandler(renderSignIn));
router.get("/signup", asyncHandler(renderSignUp));
router.post("/signin", asyncHandler(handleSignIn));
router.get('/logout', asyncHandler(handleLogout));


router.post("/signup", asyncHandler(handleSignUp));

export default router; 