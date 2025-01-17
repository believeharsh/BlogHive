import JWT from "jsonwebtoken";

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profilImageURL: user.profileImageURL,
        role: user.role


    }
    const token = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return payload;
}

export {
    createTokenForUser,
    validateToken,
}