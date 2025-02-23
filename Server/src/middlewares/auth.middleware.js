// import { validateToken } from "../services/userTokens.js";
// import { asyncHandler } from "../services/asyncHandler.js";
// import User from "../models/user.js";
// import { ApiError } from "../services/apiError.js";
// import { ApiResponse } from "../services/apiResponse.js";

// const verifyUserJwtToken = asyncHandler(async (req, res, next) => {

//     try {
//         const userToken = req.cookies?.accessToken
//         if (!userToken) {
//             throw new ApiResponse(401, "unauthorized request")
//         }

//         const decodedToken = validateToken(userToken)
//         const user = await User.findById(decodedToken._id).select("-password -refreshToken")

//         if (!user) {
//             throw new ApiError(401, "Invalid token")
//         }

//         req.user = user
//         next()
//     } catch (error) {
//         throw new ApiError(400, error?.message || "Invalid Token")
//     }

// })

// export {
//     verifyUserJwtToken,
// }



import { validateToken } from "../services/userTokens.js";
import { asyncHandler } from "../services/asyncHandler.js";
import User from "../models/user.js";
import { ApiError } from "../services/apiError.js";

const verifyUserJwtToken = asyncHandler(async (req, res, next) => {
    try {
        const userToken = req.cookies?.accessToken;
        if (!userToken) {
            throw new ApiError(401, "Unauthorized request");
        }

        let decodedToken;
        try {
            decodedToken = validateToken(userToken); // Validate token
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                console.log("🔴 Access token expired. Requesting refresh...");
                return res.status(401).json(new ApiError(401, "Token expired, please refresh"));
            }
            throw new ApiError(400, "Invalid token");
        }

        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid Token");
    }
});

export { verifyUserJwtToken };