import follow from "../models/follow.js";
import { asyncHandler } from "../services/asyncHandler.js";

// Follow an author
const followAnAuthor = asyncHandler(async (req, res) => {
    try {
        const authorId = req.params.authorId;  
        const userId = req.user.id;

        console.log("UserId:", userId);
        console.log("AuthorId:", authorId);

        const existingFollow = await follow.findOne({
            follower: userId,
            following: authorId,  
        });

        if (existingFollow) {
            return res.status(400).json({ message: "You already follow this user" });
        }

        const newFollow = new follow({
            follower: userId,
            following: authorId,  
        });

        await newFollow.save();
        res.status(200).json({ message: "Author followed successfully" });
    } catch (error) {
        console.error("Follow error:", error);
        res.status(500).json({ message: error.message });
    }
});


const unFollowAnAuthor = asyncHandler(async (req, res) => {
    try {
        const authorId = req.params.authorId;
        const userId = req.user.id;

        console.log("UserId:", userId);
        console.log("AuthorId:", authorId);

        const followEntry = await follow.findOneAndDelete({
            follower: userId,
            following: authorId
        });

        if (!followEntry) {
            return res.status(400).json({ message: "You are not following this user" });
        }

        res.status(200).json({ message: "Author unfollowed successfully" });
    } catch (error) {
        console.error("Unfollow error:", error);
        res.status(500).json({ message: error.message });
    }
});


const isAlreadyFollwing = asyncHandler(async(req, res) => {
    const authorId = req.params.authorId;
    const userId = req.user.id;
    try {
        const isFollowing = await follow.exists({
            follower: userId,
            following: authorId
        });

        res.status(200).json({ isFollowing: !!isFollowing });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
})


export {
    followAnAuthor,
    unFollowAnAuthor,
    isAlreadyFollwing
}