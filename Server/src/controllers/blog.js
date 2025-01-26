import Blog from "../models/blog.js";
import Comments from "../models/comments.js";
import { ApiResponse } from "../services/apiResponse.js";
import { ApiError } from "../services/apiError.js";
import { asyncHandler } from "../services/asyncHandler.js";


const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comments.find({ blogId: req.params.id }).populate("createdBy")

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: req.user,
                    blog: blog,
                    comments: comments,
                },
                "blog fetched succussfully by given Id"
            ))
})


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
    console.log(req.file);
    if (!title && !body) {
        return new ApiError(
            400,
            "title and body are required fields"
        )
    }
    if (!req.file) {
        return res.status(400).json({ error: "Cover image is required" });
    }
    
    const originalFilePath = req.file.filename 
    console.log(originalFilePath);
    const sanitizedFilePath = originalFilePath.replace(/\s/g, "_")
    console.log(sanitizedFilePath) ; 

    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${sanitizedFilePath}`,
    })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    blogId: blog._id,
                },
                "new blog posted succussfully"
            ))
})

const getAllBlogsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user._id.toString(); // Ensure the user ID is a string

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


export {
    getBlogById,
    handleAddNewComment,
    handleAddNewBlog,
    getAllBlogsByUserId
}