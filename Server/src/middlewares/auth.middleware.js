import { validateToken } from "../services/authentication.js";
import { asyncHandler } from "../services/asyncHandler.js";
import User from "../models/user.js";
import { ApiError } from "../services/apiError.js";
import { ApiResponse } from "../services/apiResponse.js";

const verifyUserJwtToken = asyncHandler(async (req, res, next) => {

    try {
        const userToken = req.cookies?.token
        console.log(userToken)

        if (!userToken) {
            throw new ApiResponse(401, "unauthorized request")
        }

        const decodedToken = validateToken(userToken)
        const user = await User.findById(decodedToken._id).select("-password")

        if (!user) {
            throw new ApiError(401, "Invalid token")
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid Token")
    }

})

export {
    verifyUserJwtToken,
}