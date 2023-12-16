const jwt = require("jsonwebtoken");
const CustomError = require("../utils/createCustomeError");

const createToken = (userId) => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign({ id: userId }, secret);
};

const validateToken = (token) => {
    try {
        const secret = process.env.JWT_SECRET;
        const anse = jwt.verify(token, secret);
        return anse;
    } catch (error) {
        return new CustomError(401, "Authentication needed.");
    }
};

module.exports = { createToken, validateToken };
