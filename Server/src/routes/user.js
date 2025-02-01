import { Router } from "express";
import {
    loginUser, 
    logoutUser, 
    registerUser, 
    getCurrentUser,
    checkAuth
} from "../controllers/user.js";
import { verifyUserJwtToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.post("/signin", loginUser);
router.get('/logout', verifyUserJwtToken, logoutUser);
router.post("/signup", upload.single("avatar"), registerUser);
router.get("/profile", verifyUserJwtToken,  getCurrentUser)
router.get("/checkAuth", verifyUserJwtToken, checkAuth )


export default router; 