import express from "express"
import {
    likeABlog,
    UnlikeABlog,
    getTotalLikesOfBlog,
    isUserAlreadyLikeTheBlog
} from "../controllers/like.js"

import { verifyUserJwtToken } from "../middlewares/auth.middleware.js"

const likeRoute = express.Router()

likeRoute.post("/like-a-blog", verifyUserJwtToken, likeABlog)
likeRoute.delete("/Unlike-a-blog", verifyUserJwtToken, UnlikeABlog)
likeRoute.get("/get-total-likes/:blogId", verifyUserJwtToken, getTotalLikesOfBlog)
likeRoute.get("/is-already-liked/:blogId", verifyUserJwtToken, isUserAlreadyLikeTheBlog)

export default likeRoute 