const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { findOneUser, createOneUser } = require('../repositories/user.repository');
const createToken = require('../utils/create-token');
const { UserForRegistration, UserForLogin } = require("../dto/user.dto");

const registrationService = async( body ) => {
    try {
        const { username, email, password } = new UserForRegistration(body);

        const user = await findOneUser(email);
    
        if(user) {
            const error = new Error("User already exists.");
            error.message = "User already exists.";
            error.status = 400;
            throw error;
        }
        
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await createOneUser(username, email, hashPassword);

        return createToken(newUser.username);   
    } catch (error) {   
        throw error;
    }
}

const loginService = async(body) => {
    try {
        const { email, password } = new UserForLogin(body);

        const user = await findOneUser(email);

        if(!user) {
            const error = new Error("User not found.");
            error.message = "User not found.";
            error.status = 404;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            const error = new Error("Invalid credentials");
            error.message = "Invalid credentials";
            error.status = 400;
            throw error;
        }

        return createToken(user.username);
    } catch (error) {
        throw error;
    }
};

module.exports = { loginService, registrationService };