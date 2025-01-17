import Blog from "../models/blog.js" ; 
import Comments from "../models/comments.js" ; 


const renderAddNewBlog = async (req, res) => {
    res.render("addblog", {
        user: req.user,
    })
}

const getBlogById = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comments.find({ blogId: req.params.id }).populate("createdBy");

    return res.render('blog', {
        user: req.user,
        blog: blog,
        comments,
    });
}


const handleAddNewComment = async (req, res) => {
    await Comments.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    });

    return res.redirect(`/blog/${req.params.blogId}`)
}

const handleAddNewBlog  = async (req, res) => {
    const { title, body } = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
}

export {
    renderAddNewBlog,
    getBlogById,
    handleAddNewComment,
    handleAddNewBlog
}