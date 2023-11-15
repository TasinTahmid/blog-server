const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findOneUser } = require('../repositories/user.repository');


const loginService = async(email, password) => {
    try {
        const user = await findOneUser(email);

        if(!user) return res.status(404).send({"messege": "User not found."});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).send({"messege": "Invalid credentials."});
        
        return jwt.sign({id: user.id}, "secret-key");

    } catch (error) {
        console.log(error);
        res.status(500).send({"messege": "Internal server error."});    
    }
};

module.exports = { loginService };