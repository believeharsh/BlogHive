// import dotenv from "dotenv"
// import express from "express"
// import cors from "cors"

// import userRoute from "./routes/user.js"
// import blogRoute from "./routes/blog.js"
// import commentsRoute from "./routes/comments.js"
// import path from "path"
// import cookieParser from "cookie-parser"
// import adminRoute from "./routes/admin.js"
// import followRoute from "./routes/follow.js"
// import likeRoute from "./routes/likes.js"

// dotenv.config()

// const app = express()

// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     credentials: true
// }))


// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));


// app.use(cookieParser())
// app.use(express.static(path.resolve("./public")))

// app.get("/", (req, res) => {
//     res.json("Hello, from server")
// });

// app.use("/user", userRoute)
// app.use("/blog", blogRoute)
// app.use("/comment", commentsRoute)
// app.use("/admin", adminRoute)
// app.use("/follow", followRoute)
// app.use("/like", likeRoute )


// export { app }




import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import blogRoute from "./routes/blog.js";
import commentsRoute from "./routes/comments.js";
import adminRoute from "./routes/admin.js";
import followRoute from "./routes/follow.js";
import likeRoute from "./routes/likes.js";

dotenv.config();

const app = express();

// 1. this is for Keeping the Server Running on Vercel (Ping Route)
setInterval(() => {
    fetch(process.env.FRONTEND_URL + "/ping")
        .then((res) => res.text())
        .then(console.log)
        .catch(console.error);
}, 10 * 60 * 1000); // Every 10 minutes

// 2. CORS Setup
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// 3. Parse JSON & URL Data
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 4. Use Cookies
app.use(cookieParser());

// 5. Serve Static Files
app.use(express.static(path.resolve("./public")));

// 6. Health Check Route (For Debugging & Monitoring)
app.get("/ping", (req, res) => {
    res.status(200).json({ status: "Server is running smoothly!" });
});

// 7. API Routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use("/comment", commentsRoute);
app.use("/admin", adminRoute);
app.use("/follow", followRoute);
app.use("/like", likeRoute);

// 8. Global Error Handler (To Prevent Crashes)
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// 9. Graceful Shutdown (Handles Vercel Restarts Properly)
process.on("SIGINT", () => {
    console.log("❌ Server is shutting down...");
    process.exit();
});

process.on("SIGTERM", () => {
    console.log("❌ Server is shutting down gracefully...");
    process.exit();
});

export { app };



