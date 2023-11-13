const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../user/user.model");

const register = async(req, res) => {
    // cosnt {}

    const newUser = await User.create(req.body);
    res.status(200).send(newUser);
};

const login = async(req, res) => {
    res.status(200).send(req.body);
};

module.exports = { register, login };