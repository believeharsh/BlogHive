const { validateToken } = require("../services/authentication");

const checkForAuthCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            next()
        }
        try {
            const userpayload = validateToken(tokenCookieValue);
            req.user = userpayload;

        } catch (error) {
            next();
        }


    }
}

module.exports = {
    checkForAuthCookie,
}