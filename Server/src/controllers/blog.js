import Blog from "../models/blog.js";
import Comments from "../models/comments.js";
import { ApiResponse } from "../services/apiResponse.js";
import { ApiError } from "../services/apiError.js";
import { asyncHandler } from "../services/asyncHandler.js";
import path from "path";

import { uploadOnCloudinary } from "../services/cloudinary.js"

const getBlogById = asyncHandler(async (req, res) => {
    // Find the blog by its ID
    const blog = await Blog.findById(req.params.id).populate("createdBy");

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    // Fetch comments related to the blog
    const comments = await Comments.find({ blogId: req.params.id }).populate("createdBy");

    return res.status(200).json({
        user: req.user,
        blog: blog,
        comments: comments,
        message: "Blog fetched successfully by given Id"
    });
});

const handleAddNewComment = asyncHandler(async (req, res) => {
    await Comments.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "comment posted succussfully"
            ))
})

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
        body : body,
        title : title,
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
    const blogs = await Blog.find({ createdBy: userId });

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

const handleDeleteBlogById = asyncHandler( async (req, res) => {
    // console.log(req.params) ; 
    const { blogId } = req.params 

    const tobeDeletedBlog = await Blog.findByIdAndDelete(blogId) ; 
    if(!tobeDeletedBlog){
     throw new ApiError(400, "blog didn't found") ;    
    }

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


export {
    getBlogById,
    handleAddNewComment,
    handleAddNewBlog,
    getAllBlogsByUserId,
    handleDeleteBlogById
}