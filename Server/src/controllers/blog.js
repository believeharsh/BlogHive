import Blog from "../models/blog.js";
import Comments from "../models/comments.js";
import { ApiResponse } from "../services/apiResponse.js";
import { ApiError } from "../services/apiError.js";
import { asyncHandler } from "../services/asyncHandler.js";


const getBlogById = asyncHandler(async (req, res) => {
    // Find the blog by its ID
    const blog = await Blog.findById(req.params.id).populate("createdBy");

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    // Format the blog response
    const formattedBlog = {
        _id: blog._id,
        title: blog.title,
        body: blog.body,
        coverImage: `data:${blog.coverImage.contentType};base64,${blog.coverImage.data.toString('base64')}`,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        createdBy: blog.createdBy
    };

    // Fetch comments related to the blog
    const comments = await Comments.find({ blogId: req.params.id }).populate("createdBy");

    return res.status(200).json({
        user: req.user,
        blog: formattedBlog,
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
    console.log(req.file);

    if (!(title && body)) {
        return new ApiError(
            400,
            "title and body are required fields"
        )
    }
    if (!req.file) {
        return res.status(400).json({ error: "Cover image is required" });
    }
    const coverImage = req.file;
    console.log(coverImage);

    const newblog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImage: {
            data: req.file.buffer,  // Store image as binary
            contentType: req.file.mimetype
        }
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
    console.log(blogs)
    
    const formattedBlogs = blogs.map(blog => ({
        _id: blog._id,
        title: blog.title,
        body: blog.body,
        coverImage: `data:${blog.coverImage.contentType};base64,${blog.coverImage.data.toString('base64')}`,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        createdBy: blog.createdBy
    }));

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                blogs: formattedBlogs,
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