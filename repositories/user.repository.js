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

module.exports.createUser = async (userData) => {
    try {
        return await User.create(userData);

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

module.exports.updateUserById = async (user, userData) => {
    try {
        return await user.update(userData);   
         
    } catch (error) {
        throw error;
    }
}
