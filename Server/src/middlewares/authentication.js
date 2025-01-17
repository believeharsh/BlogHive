import { validateToken } from "../services/authentication.js" ; 

const checkForAuthCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]; 
        if (!tokenCookieValue) {
            req.user = null; 
            return next(); 
        }
        try {
            const userpayload = validateToken(tokenCookieValue); 
            req.user = userpayload; 
        } catch (error) {
            console.error("Invalid token:", error); 
            req.user = null; 
        }
        next();
    };
};

export  {
    checkForAuthCookie,
}