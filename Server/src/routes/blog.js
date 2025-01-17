import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { asyncHandler } from "../services/asyncHandler.js";
import { handleAddNewComment, getBlogById, renderAddNewBlog, handleAddNewBlog } from "../controllers/blog.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/add-new", asyncHandler(renderAddNewBlog));
router.get("/:id", asyncHandler(getBlogById));
router.post("/comment/:blogId", asyncHandler(handleAddNewComment));
router.post("/", upload.single("coverImage"), asyncHandler(handleAddNewBlog));

export default router; 