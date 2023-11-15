const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const {registration} = require("../services/registration.service");
const { loginService } = require("../services/login.service");

const register = async(req, res) => {
    try {

        const { username, email, password } = req.body;

        const newUser = await registration(username, email, password);
        
        

        res.status(201).send(newUser);
    } catch (error) {
        console.log(error.messege);
        res.status(500).send({"messege": "Internal server error000."});
    }
};

const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const token = await loginService(email, password);

        res.cookie("access-token", token, { maxAge: 3600*1000});
        res.status(200).send("User logged in successfully.");

    } catch (error) {
        console.log(error.messege);
        res.status(500).send({"messege": "Internal server error."});    
    }
};

module.exports = { register, login };