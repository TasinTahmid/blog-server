const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { findOneUser } = require('../repositories/user.repository');
const createToken = require('../utils/create-token');


const loginService = async(email, password) => {
    try {
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
        console.log(error);
        res.status(500).send({"messege": "Internal server error."});    
    }
};

module.exports = { loginService };