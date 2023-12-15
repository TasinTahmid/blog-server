const jwt = require("jsonwebtoken");
const CustomError = require("../utils/createCustomeError");

const secret = process.env.JWT_SECRET;

const createToken = (userId) => {
    return jwt.sign({ id: userId }, secret);
};

const validateToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (e) {
        throw new CustomError(401, "Authentication needed.");
    }
};

module.exports = { createToken, validateToken };
