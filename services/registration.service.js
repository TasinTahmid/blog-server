const bcrypt = require("bcrypt");
const { findOneUser, createOneUser } = require('../repositories/user.repository');
const createToken = require('../utils/create-token');

const registrationService = async( username, email, password ) => {
    try {
        const user = await findOneUser(email);
    
        if(user) return null;
        
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
    
        const newUser = await createOneUser(username, email, hashPassword);
        
        return createToken(newUser.username);
    } catch (error) {
        console.log(error);
        return res.status(500).send({"messege": "Internal server error."});
    }
}

module.exports = { registrationService };