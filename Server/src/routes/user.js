import { Router } from "express";
import {
    loginUser, 
    logoutUser, 
    registerUser, 
    getCurrentUser,
    checkAuth,
    refreshAccessToken
} from "../controllers/user.js";
import { verifyUserJwtToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.post("/signin", loginUser);
router.get('/logout', verifyUserJwtToken, logoutUser);
router.post("/signup", upload.single("avatar"), registerUser);
router.get("/profile", verifyUserJwtToken,  getCurrentUser)
router.get("/checkAuth", verifyUserJwtToken, checkAuth )
router.post("/refresh-token", refreshAccessToken)


export default router; 