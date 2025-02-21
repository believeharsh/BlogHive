import likes from "../models/like.js";
import { asyncHandler } from "../services/asyncHandler.js";

const likeABlog = asyncHandler(async (req, res) => {
    try {
        const { blogId } = req.body;
        const userId = req.user.id; 
    
        const existingLike = await likes.findOne({ userId, blogId });
    
        if (existingLike) {
          return res.status(400).json({ message: "You have already liked this blog" });
        }
    
        // Creating a new like
        const newLike = new likes({ userId, blogId });
        await newLike.save();
    
        res.status(201).json({ message: "Blog liked successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error liking blog", error });
      }
})

const UnlikeABlog = asyncHandler( async (req, res) => {
    try {
        const { blogId } = req.body;
        const userId = req.user.id;
    
        const like = await likes.findOneAndDelete({ userId, blogId });
    
        if (!like) {
          return res.status(404).json({ message: "Like not found" });
        }
    
        res.status(200).json({ message: "Blog unliked successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error unliking blog", error });
      }
})


const getTotalLikesOfBlog = asyncHandler( async(req, res) => {
    try {
        const { blogId } = req.params;
        const likeCount = await likes.countDocuments({ blogId });
    
        res.status(200).json({ likeCount });
      } catch (error) {
        res.status(500).json({ message: "Error fetching likes", error });
        console.log(error)
      }
})

const isUserAlreadyLikeTheBlog = asyncHandler( async ( req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user.id;
    
        const existingLike = await likes.findOne({ userId, blogId });
    
        res.status(200).json({ isLiked: !!existingLike });
      } catch (error) {
        res.status(500).json({ message: "Error checking like status", error });
        console.log(error)
      }
})



export {
    likeABlog,
    UnlikeABlog,
    getTotalLikesOfBlog,
    isUserAlreadyLikeTheBlog

}