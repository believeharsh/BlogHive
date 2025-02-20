import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { verifyUserJwtToken } from "../middlewares/auth.middleware.js";
import { ServeAdminDashBoard } from "../controllers/admin.js";



const adminRoute = Router() ; 

adminRoute.get("/Admin-DashBoard", verifyUserJwtToken, adminMiddleware, ServeAdminDashBoard)

export default adminRoute ; 