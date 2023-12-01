const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const createToken = (userId) => {
    return jwt.sign({ id: userId }, secret);
};

const validateToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (e) {
        const error = new Error("Authentication needed.");
        error.message = "Authentication needed.";
        error.status = 401;
        throw error;
    }
};

module.exports = { createToken, validateToken };
