const User = require("../models/user.model");

const findOneUser = async (email) => {
    try {
        return await User.findOne({ where: { email } });

    } catch (error) {
        console.log(error);
        return res.status(500).send({"messege": "Internal server error."});    
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
        console.log(error);
        return res.status(500).send({"messege": "Internal server error."});        
    }
    
}

module.exports = { findOneUser, createOneUser };