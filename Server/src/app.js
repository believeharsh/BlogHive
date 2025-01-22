import express from "express";
import cors from "cors"
import userRoute from "./routes/user.js";
import blogRoute from "./routes/blog.js"
import path from "path";
import cookieParser from "cookie-parser";
// import Blog from "./models/blog.js";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));


// app.get("/", async (req, res) => {
//     try {
//         if (!req.user) {
//             // Handle unauthenticated user
//             return res.render("home", {
//                 user: null,
//                 blogs: [], // Show no blogs for unauthenticated users
//             });
//         }

//         const userId = req.user._id;
//         const userBlogs = await Blog.find({ createdBy: userId });

//         res.render("home", {
//             user: req.user,
//             blogs: userBlogs, // Only the user's blogs
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("An error occurred while fetching blogs.");
//     }
// });


app.use("/user", userRoute);
app.use("/blog", blogRoute);

export { app }







