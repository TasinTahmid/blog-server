const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { findOneUser, createOneUser } = require('../repositories/user.repository');

const registration = async( username, email, password ) => {
    try {
        const user = await findOneUser(email);
    
        if(user) return res.status(400).send({"messege": "User already exists with this email."});
        
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
    
        const newUser = await createOneUser(username, email, hashPassword);
        
        return newUser;   
    } catch (error) {
        console.log(error)
        return res.status(500).send({"messege": "Internal server error."});
    }
}

module.exports = { registration };