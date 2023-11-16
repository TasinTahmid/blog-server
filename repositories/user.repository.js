const User = require("../models/user.model");

const findOneUser = async (email) => {
    try {
        return await User.findOne({ where: { email } });

    } catch (error) {        
        return error;   
    }
}

const createOneUser = async (username, email, hashPassword) => {
    try {
        return await User.create({
            username,
            email,
            password: hashPassword
        });

    } catch (error) {
        return error;           
    }
    
}

module.exports = { findOneUser, createOneUser };