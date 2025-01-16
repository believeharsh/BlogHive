import { Router } from "express" ; 
import multer from 'multer' ; 
import path from 'path' ; 
import Blog from "../models/blog.js" ; 
import Comments from "../models/comments.js" ; 
import { asyncHandler } from "../services/asyncHandler.js";

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
router.get("/add-new", asyncHandler(async (req, res) => {
    res.render("addblog", {
        user: req.user,
    })
})) ; 

router.get("/:id", asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comments.find({ blogId: req.params.id }).populate("createdBy");

    return res.render('blog', {
        user: req.user,
        blog: blog,
        comments,
    });
}));

router.post("/comment/:blogId", asyncHandler(async (req, res) => {
    await Comments.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    });

    return res.redirect(`/blog/${req.params.blogId}`)
})) ; 

router.post("/", upload.single("coverImage"), asyncHandler(async (req, res) => {
    const { title, body } = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
}));

export default router; 