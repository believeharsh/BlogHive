import express from "express";
import cors from "cors"
import userRoute from "./routes/user.js";
import blogRoute from "./routes/blog.js"
import path from "path";
import cookieParser from "cookie-parser";


const app = express()

app.use(cors(
    {
        origin: ['https://bloghive-six.vercel.app/', 'http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true
    }
))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

export { app }







