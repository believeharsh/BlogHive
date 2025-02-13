import { Router } from "express";
import {
    getBlogById,
    handleAddNewBlog,
    getAllBlogsByUserId,
    handleDeleteBlogById,
    saveBlogInTheUserProfile,
    getAllSavedBlogsByUserId,
    getAllBlogs
} from "../controllers/blog.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyUserJwtToken } from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyUserJwtToken)

router.get("/:id", getBlogById);
router.post("/getAllBlogs", getAllBlogs)
router.post("/", upload.single("coverImage"), handleAddNewBlog);
router.get("/", getAllBlogsByUserId)
router.delete("/:blogId", handleDeleteBlogById)
router.post("/saveBlog/:blogId", saveBlogInTheUserProfile )
router.get("/saved-blogs/:userId" , getAllSavedBlogsByUserId)

export default router; 