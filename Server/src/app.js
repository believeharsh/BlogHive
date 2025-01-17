import express from "express";
import userRoute from "./routes/user.js";
import blogRoute from "./routes/blog.js"
import path from "path";
import cookieParser from "cookie-parser";
import { checkForAuthCookie } from "./middlewares/authentication.js";
import Blog from "./models/blog.js";


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use(checkForAuthCookie('token'));


app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.get("/", async (req, res) => {
    try {
        const userId = req.user._id;
        const userBlogs = await Blog.find({ createdBy: userId });

        res.render("home", {
            user: req.user,
            blogs: userBlogs, // Only the user's blogs
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching blogs.");
    }
});


app.use("/user", userRoute);
app.use("/blog", blogRoute);

export { app }







