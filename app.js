require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog")
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkForAuthCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog");

const PORT = process.env.PORT || 8000;

mongoose
    .connect(process.env.MONGO_URL)
    .then((e) => console.log("MongoDB Connected"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use(checkForAuthCookie('token'));

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});

    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
})

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`server is running at port ${PORT}`)); 