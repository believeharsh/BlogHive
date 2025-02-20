import { ApiError } from "../services/apiError.js";


const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "ADMIN") {
         throw new ApiError(403, "Access Denied. Admins only.")
    }
    next();
};

export { adminMiddleware };