const jwt = require("jsonwebtoken");

const createToken = (userId) => {
    return jwt.sign({id: userId}, "secret-key");
}

const validateToken = (token) => {
    try {
        return jwt.verify(token, "secret-key");
        
    } catch (e) {
        const error = new Error("Authentication needed.");
        error.message = "Authentication needed.";
        error.status = 401;
        throw error;
    }
}

module.exports = { createToken, validateToken }