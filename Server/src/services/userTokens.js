import JWT from "jsonwebtoken";

function createAccessToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profilImageURL: user.profileImageURL,
        role: user.role


    }
    const accessToken = JWT.sign(payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
    return accessToken;
}
function createRefreshToken(userId) {
    const payload = {
        _id: userId,
    }
    const refreshToken = JWT.sign(payload,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    );
    return refreshToken;
}

function validateToken(token) {
    const payload = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return payload;
}

export {
    createAccessToken,
    createRefreshToken,
    validateToken,
}