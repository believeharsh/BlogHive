import { Router } from "express";
import { asyncHandler } from "../services/asyncHandler.js";
import { handleAddNewComment, getBlogById, handleAddNewBlog, getAllBlogsByUserId } from "../controllers/blog.js";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyUserJwtToken} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyUserJwtToken)

router.get("/:id", getBlogById);
router.post("/comment/:blogId", handleAddNewComment);
router.post("/", upload.single("coverImage"), handleAddNewBlog);
router.get("/", getAllBlogsByUserId)

export default router; 