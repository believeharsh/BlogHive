const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/user");
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkForAuthCookie } = require("./middlewares/authentication");


const PORT = 8000;


mongoose.connect('mongodb://127.0.0.1:27017/Blog-Network').then(() => {
    console.log("mongoDB is connected now");
})
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser);
app.use(checkForAuthCookie('token'));

app.get("/", (req, res) => {
    res.render("home", {
        user: req.user,
    });
})

app.use("/user", userRoute)

app.listen(PORT, () => console.log("server is running at port 8000")); 