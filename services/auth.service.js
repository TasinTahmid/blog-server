const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { findOneUser } = require('../repositories/user.repository');
const createToken = require('../utils/create-token');
const { parseUserInfoForLogin, parseUserInfoForRegistration } = require("../dto/user.dto");

const registrationService = async( body, next ) => {
    try {
        const { username, email, password } = parseUserInfoForRegistration(body);

        const returnValue = {};

        const user = await findOneUser(email);
    
        if(user) {
            returnValue.err = "User already exists.";
            returnValue.status = 400;
            return returnValue;
        }
        
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        console.log("hi")
        const newUser = await createOneUser(username, email, hashPassword);
        console.log("by")
        return returnValue.token = createToken(newUser.username);
    } catch (error) {
        // returnValue.err = error;
        // returnValue.status = 500;
        // return { err: error, status:500};
        next(error);
    }
}

const loginService = async(body) => {
    try {
        const { email, password } = parseUserInfoForLogin(body);

        const returnValue = {};
        const user = await findOneUser(email);

        if(!user) {
            returnValue.err = "User not found.";
            returnValue.status = 404;
            return returnValue;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            returnValue.err = "Invalid credentials.";
            returnValue.status = 400;
            return returnValue;

        }

        returnValue.token = createToken(user.username);
        return returnValue;

    } catch (error) {
        return error;   
    }
};

module.exports = { loginService, registrationService };