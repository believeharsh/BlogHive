import User from "../models/user.js"
import { ApiError } from "../services/apiError.js"
import { ApiResponse } from "../services/apiResponse.js"
import { asyncHandler } from "../services/asyncHandler.js"


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email && !password) {
        throw new ApiError(400, "email or password is required")
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(400, "user does not exists")
    }
    const token = await User.matchPassAndGenToken(email, password);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("token", token, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: token,
                },
                "user logged in succussfully"
            )
        )

})

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body

    if ([fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "all fields are required")
    }

    const isUserExists = await User.findOne({ email })
    if (isUserExists) {
        throw new ApiError(409, "user already exists with this email")
    }

    const newUser = await User.create({
        fullName,
        email,
        password
    });

    const createdUser = await User.findById(newUser._id).select("-password")
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while creating new user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered succussfully")
    )
});

const logoutUser = asyncHandler( async (req, res) => {
    console.log(req.user._id) ; 

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
    .clearCookie("token", options)
    .json(
        new ApiResponse(200, {}, "user is logged out now")
    )
}) ; 

export {
    loginUser,
    logoutUser,
    registerUser
}