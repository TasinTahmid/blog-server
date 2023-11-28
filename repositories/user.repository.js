const User = require("../models/user.model");

module.exports.getUserByUsername = async (username) => {
    try {
        return await User.findOne({ where: { username } });

    } catch (error) {        
        throw error;   
    }
}

module.exports.getUserByEmail = async (email) => {
    try {
        return await User.findOne({ where: { email } });

    } catch (error) {        
        throw error;   
    }
}

module.exports.getUserById = async (id) => {
    try {
        return await User.findOne({ where: { id } });

    } catch (error) {        
        throw error;   
    }
}

module.exports.createUser = async (username, email, hashPassword) => {
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

module.exports.deleteUserById = async (user) => {
    try {
        return await user.destroy();
        
    } catch (error) {
        throw error;
    }
}

module.exports.updateUserById = async (user, password) => {
    try {
        return await user.update({ password });
        
    } catch (error) {
        throw error;
    }
}
