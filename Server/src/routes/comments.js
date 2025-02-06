import { Router } from "express";
import { addNewComment, getAllCommentsByBlogId } from "../controllers/comments.js"
import { verifyUserJwtToken } from "../middlewares/auth.middleware.js"


const commentsRoute = Router() 

commentsRoute.use(verifyUserJwtToken)

commentsRoute.post("/:blogId" , addNewComment)
commentsRoute.get("/:blogId" , getAllCommentsByBlogId) 

export default commentsRoute 