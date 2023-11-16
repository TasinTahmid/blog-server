const bcrypt = require("bcrypt");
const { findOneUser, createOneUser } = require('../repositories/user.repository');
const createToken = require('../utils/create-token');
const { parseUserInfoForRegistration } = require("../dto/user.dto");

const registrationService = async( body ) => {
    try {
        const { username, email, password } = parseUserInfoForRegistration(body);

        const user = await findOneUser(email);
    
        if(user) return null;
        
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
    
        const newUser = await createOneUser(username, email, hashPassword);
        
        return createToken(newUser.username);
    } catch (error) {
        return error;
    }
}

module.exports = { registrationService };