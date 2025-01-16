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
    const allBlogs = await Blog.find({});

    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
})

app.use("/user", userRoute);
app.use("/blog", blogRoute);

export { app }







