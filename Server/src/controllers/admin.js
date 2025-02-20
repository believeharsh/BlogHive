import { asyncHandler } from "../services/asyncHandler.js";
import User from "../models/user.js"
import Blog from "../models/blog.js";
import { ApiResponse } from "../services/apiResponse.js";

const ServeAdminDashBoard = asyncHandler(async (req, res) => {
    // Fetch total counts
    const totalUsers = await User.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    // Fetch latest users and blogs
    const latestUsers = await User.find().sort({ createdAt: -1 }).limit(5).select("fullName email createdAt profileImageURL");
    const latestBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5).select("title body createdAt coverImage")
    .populate("createdBy", "fullName email profileImageURL")

    return res.status(200).json(new ApiResponse(200, {
        totalUsers,
        totalBlogs,
        latestUsers,
        latestBlogs
    }, "Admin dashboard data fetched successfully"));
});

export { ServeAdminDashBoard };
