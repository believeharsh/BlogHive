const JWT = require("jsonwebtoken");
const secret = "$helloback--end6789()&*";

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profilImageURL: user.profileImageURL,
        role: user.role


    }
    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
}