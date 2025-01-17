import User from "../models/user.js";


const renderSignIn = (req, res) => {
    res.render("signin");
}

const renderSignUp = (req, res) => {
    res.render("signup");
}

const handleSignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPassAndGenToken(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render('signin', {
            error: 'Incorrect email or password'
        })
    }
}

const handleSignUp = async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect("/");
}

const handleLogout = (req, res) => {
    res.clearCookie("token").redirect("/");
}

export {
    renderSignIn,
    renderSignUp,
    handleSignIn,
    handleLogout,
    handleSignUp
}