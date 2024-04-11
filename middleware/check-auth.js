const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkAuth(req, res, next) {
    try {
        // Accessing the JWT_KEY environment variable
        const jwtKey = process.env.JWT_KEY;

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, jwtKey);
        req.userData = decodedToken;
        next();
    } catch (e) {
        return res.status(401).json({
            message: "Invalid or expired token provided",
            error: e
        });
    }
}

module.exports = {
    checkAuth: checkAuth
};

