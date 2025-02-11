import Blog from "../models/blog.js";
import SavedBlogs from "../models/savedBlogs.js";
import Comments from "../models/comments.js";
import { ApiResponse } from "../services/apiResponse.js";
import { ApiError } from "../services/apiError.js";
import { asyncHandler } from "../services/asyncHandler.js";
import path from "path";
import { uploadOnCloudinary } from "../services/cloudinary.js"
import mongoose from "mongoose";

const getBlogById = asyncHandler(async (req, res) => {
    // fetching related blog here
    const blog = await Blog.findById(req.params.id).populate("createdBy", "profileImageURL fullName email username");

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    // Fetch comments related to the blog
    const comments = await Comments.find({ blogId: req.params.id }).populate("createdBy", "fullName username profileImageURL");

    const isAuthor = blog.createdBy._id.toString() === req.user._id.toString();

    return res.status(200).json({
        user: req.user,
        blog: blog,
        comments: comments,
        isAuthor: isAuthor,
        message: "Blog fetched successfully by given Id"
    });
});

const handleAddNewBlog = asyncHandler(async (req, res) => {
    const { title, body } = req.body;
    // console.log(req.file);

    if (!(title && body)) {
        return new ApiError(
            400,
            "title and body are required fields"
        )
    }
    let coverImageURL;
    if (req.file) {
        const coverImageLocalPath = path.resolve(req.file.path);
        const coverImage = await uploadOnCloudinary(coverImageLocalPath);
        console.log(coverImage)
        if (coverImage) coverImageURL = coverImage.secure_url;
    }

    const newblog = await Blog.create({
        body: body,
        title: title,
        createdBy: req.user._id,
        coverImage: coverImageURL
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    blogId: newblog._id,
                },
                "new blog posted succussfully"
            ))
})

const getAllBlogsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user._id.toString();

    // Finding all blogs created by the current user
    const blogs = await Blog.find({ createdBy: userId }).populate("createdBy", "fullName profileImageURL username")

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                blogs: blogs,
            },
            "Fetched all blogs of current user successfully"
        )
    );
});

const handleDeleteBlogById = asyncHandler(async (req, res) => {
    // console.log(req.params) ; 
    const { blogId } = req.params

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        throw new ApiError(400, "Invalid blog ID");
    }

    const tobeDeletedBlog = await Blog.findById(blogId);
    if (!tobeDeletedBlog) {
        throw new ApiError(404, "Blog not found");
    }

    if (tobeDeletedBlog.createdBy._id.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized to delete this blog");
    }

    await tobeDeletedBlog.deleteOne()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "blog deleted succussfully"
            )
        )
})

const saveBlogInTheUserProfile = asyncHandler(async (req, res) => {
    const { blogId } = req.params
    const { userId } = req.body

    if (!blogId || !userId) {
        throw new ApiError(400, "blog and user Id are required")
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(400, "no blog found with give blog id")
    }

    let newSavedBlog = await SavedBlogs.create({
        savedBy: userId,
        savedBlogId: blogId
    })
    
    newSavedBlog = await newSavedBlog.populate(
        "savedBlogId",
        "title body coverImage createdBy createdAt"
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                newSavedBlog,
                "blog saved succussfully now"

            )
        )

})

const getAllSavedBlogsByUserId = asyncHandler(async (req, res) => {

    const {userId} = req.params
    userId.toString() ; 

    if(!userId){
        throw new ApiError(400, "userId is required")
    }

    if (!mongoose.isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId format");
    }

    const allSavedBlogs = await SavedBlogs.find({ savedBy: userId })
    .populate({
        path: "savedBlogId",
        select: "title body coverImage createdBy createdAt",
        populate: { path: "createdBy", select: "name email profileImageURL fullName username" },
      });

    if(!allSavedBlogs){
        throw new ApiError(409, "no blogs saved as of now ") 
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                allSavedBlogs,
                "all Saved blogs fetched succussfully"
            )
        )
})


export {
    getBlogById,
    handleAddNewBlog,
    getAllBlogsByUserId,
    handleDeleteBlogById,
    saveBlogInTheUserProfile,
    getAllSavedBlogsByUserId
}