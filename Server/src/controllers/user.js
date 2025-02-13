import User from "../models/user.js"
import { ApiError } from "../services/apiError.js"
import { ApiResponse } from "../services/apiResponse.js"
import { asyncHandler } from "../services/asyncHandler.js"
import { uploadOnCloudinary } from "../services/cloudinary.js"
import path from "path"
import { generateUsername } from "../services/generateUsername.js"
import JWT from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "../services/userTokens.js"

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email && !password) {
        throw new ApiError(400, "email or password is required")
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(400, "user does not exists")
    }

    const { accessToken, refreshToken } = await User.matchPassAndGenTokens(email, password);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: accessToken, refreshToken
                },
                "user logged in succussfully"
            )
        )

})

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password} = req.body

    if ([fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "all fields are required")
    }

    const isUserExists = await User.findOne({ email })
    if (isUserExists) {
        throw new ApiError(409, "user already exists with this email")
    }

    const generatedUsername = generateUsername(email);
    if (!generatedUsername) {
        throw new ApiError(409, "error occured while generating the username for the user")
    }

    let avatarUrl
    if (req.file) {
        const avatarLocalPath = path.resolve(req.file.path);
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (avatar) avatarUrl = avatar.secure_url;
    }

    const newUser = await User.create({
        username: generatedUsername,
        fullName: fullName,
        email: email,
        password: password,
        profileImageURL: avatarUrl
    });

    const createdUser = await User.findById(newUser._id).select("-password")
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while creating new user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered succussfully")
    )
});

const logoutUser = asyncHandler(async (req, res) => {
    console.log(req.user._id);

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "user is logged out now")
        )
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword && !newPassword) {
        throw new ApiError(400, "give existing and new password correctly")
    }

    const user = await User.findById(req.user._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "wrong password")
    }

    user.password = newPassword
    user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "password changes succussfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    // console.log(req.user)
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "user fetched succussfully"
            ))
})

const checkAuth = asyncHandler(async (req, res) => {
    // console.log(req.user)
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "user is authenticated"
            )
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized Request")
    }

    try {

        const decodedToken = JWT.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const newAccessToken = await createAccessToken(user)
        const newRefreshToken = await createRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", newAccessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { newAccessToken, refreshToken: newRefreshToken },
                    "accessToken Refreshed"
                )
            )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")

    }

})

export {
    loginUser,
    logoutUser,
    registerUser,
    getCurrentUser,
    checkAuth,
    refreshAccessToken
}