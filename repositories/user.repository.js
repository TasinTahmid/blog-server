const User = require("../models/user.model");

const findOneUser = async (email) => {
    try {
        return await User.findOne({ where: { email } });

    } catch (error) {        
        throw error;   
    }
}

const findUserById = async (id) => {
    try {
        return await User.findOne({ where: { id } });

    } catch (error) {        
        throw error;   
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
        throw error;           
    }
    
}

module.exports = { findOneUser, createOneUser, findUserById };