import Blog from "../models/blog.js"
import Comments from "../models/comments.js"
import { ApiError } from "../services/apiError.js"
import { ApiResponse } from "../services/apiResponse.js"
import { asyncHandler } from "../services/asyncHandler.js"


const addNewComment = asyncHandler(async (req, res) => {
    const userId = req.user._id.toString()
    if (!userId) {
        throw new ApiError(401, "Unauthorized: Please log in to comment")
    }

    const { content } = req.body
    const { blogId } = req.params

    if (!content || content.trim() === "") {
        throw new ApiError(400, "comment can not be empty")
    }

    const blog = await Blog.findById(blogId)
    if (!blog) {
        throw new ApiError(404, "blog not found")
    }

    let newComment = await Comments.create({
        content: content,
        blogId: blogId,
        createdBy: userId,
    })

    newComment = await newComment.populate("createdBy", "fullName username profileImageURL")
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {"newComment" : newComment},
                "comment posted succussfully"
            ))
})

const editComment = asyncHandler(async (req, res) => {

})

const deleteComment = asyncHandler(async (req, res) => {

})

const getAllCommentsByBlogId = asyncHandler(async (req, res) => {

    const { blogId } = req.params

    if (!blogId) {
        throw new ApiError(400, "blog Id is required to fetch the comments")
    }

    const comments = await Comments.find({ blogId })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                comments,
                "all comments fetched succussfully now"
            )
        )
})


export {
    addNewComment,
    editComment,
    deleteComment,
    getAllCommentsByBlogId
}



