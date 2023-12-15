const jwt = require("jsonwebtoken");
const CustomError = require("../utils/createCustomeError");

const secret = process.env.JWT_SECRET;

const createToken = (userId) => {
    return jwt.sign({ id: userId }, secret);
};

const validateToken = (token) => {
    return jwt.verify(token, secret);
};

module.exports = { createToken, validateToken };
