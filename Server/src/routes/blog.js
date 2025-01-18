import { Router } from "express";
import { asyncHandler } from "../services/asyncHandler.js";
import { handleAddNewComment, getBlogById, renderAddNewBlog, handleAddNewBlog } from "../controllers/blog.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.get("/add-new", asyncHandler(renderAddNewBlog));
router.get("/:id", asyncHandler(getBlogById));
router.post("/comment/:blogId", asyncHandler(handleAddNewComment));
router.post("/", upload.single("coverImage"), asyncHandler(handleAddNewBlog));

export default router; 