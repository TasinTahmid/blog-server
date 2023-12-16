const jwt = require("jsonwebtoken");

const createToken = (userId) => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign({ id: userId }, secret);
};

const validateToken = (token) => {
    try {
        const secret = process.env.JWT_SECRET;
        return jwt.verify(token, secret);
    } catch (error) {
        return error;
    }
};

module.exports = { createToken, validateToken };
