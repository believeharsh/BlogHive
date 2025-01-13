const { validateToken } = require("../services/authentication");

const checkForAuthCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]; // Get cookie value
        if (!tokenCookieValue) {
            req.user = null; // Ensure req.user is null if no cookie is found
            return next(); // Proceed to the next middleware or route
        }
        try {
            const userpayload = validateToken(tokenCookieValue); // Validate the token
            req.user = userpayload; // Attach decoded user data to req.user
        } catch (error) {
            console.error("Invalid token:", error); // Log the error for debugging
            req.user = null; // Clear user in case of an invalid token
        }
        next(); // Proceed to the next middleware or route
    };
};

module.exports = {
    checkForAuthCookie,
}