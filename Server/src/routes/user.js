import { Router } from "express";
import User from "../models/user.js";
import { asyncHandler } from "../services/asyncHandler.js";

const router = Router();


router.get("/signin", asyncHandler((req, res) => {
    return res.render("signin");
}));

router.get("/signup", asyncHandler((req, res) => {
    return res.render("signup");
}));

router.post("/signin", asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPassAndGenToken(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render('signin', {
            error: 'Incorrect email or password'
        })
    }
}));

router.get('/logout', asyncHandler((req, res) => {
    res.clearCookie("token").redirect("/");
}));


router.post("/signup", asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect("/");
}));

export default router; 