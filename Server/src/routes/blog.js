import { Router } from "express";
import {
    getBlogById,
    handleAddNewBlog,
    getAllBlogsByUserId,
    handleDeleteBlogById
} from "../controllers/blog.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyUserJwtToken } from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyUserJwtToken)

router.get("/:id", getBlogById);
router.post("/", upload.single("coverImage"), handleAddNewBlog);
router.get("/", getAllBlogsByUserId)
router.delete("/:blogId", handleDeleteBlogById)

export default router; 