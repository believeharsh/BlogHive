import express from "express";
import cors from "cors"
import userRoute from "./routes/user.js";
import blogRoute from "./routes/blog.js"
import path from "path";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true
    }
))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    res.json("Hello, from server");
});
app.use("/user", userRoute);
app.use("/blog", blogRoute);

export { app }







