const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const { createToken } = require('../utils/jwt');
const { UserForRegistration, UserForLogin } = require("../dto/user.dto");

module.exports.register = async( body ) => {
    try {
        const { username, email, password } = new UserForRegistration(body);

        const userByUsername = await userRepo.getUserByUsername(username);
    
        if(userByUsername) {
            const error = new Error("User already exists by this username.");
            error.message = "User already exists by this username.";
            error.status = 400;
            throw error;
        }        

        const userByEmail = await userRepo.getUserByEmail(email);
    
        if(userByEmail) {
            const error = new Error("User already existsby this email.");
            error.message = "User already exists by this email.";
            error.status = 400;
            throw error;
        }
        
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await userRepo.createUser(username, email, hashPassword);

        return createToken(newUser.id);   
    } catch (error) {   
        throw error;
    }
}

module.exports.login = async(body) => {
    try {
        const { email, password } = new UserForLogin(body);

        const user = await userRepo.getUserByEmail(email);

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

        return createToken(user.id);
    } catch (error) {
        throw error;
    }
};

module.exports.updateUserById = async (id, loggedInUserId, password) => {
    try {
        const user = await userRepo.getUserById(id);
        if(!user) {
            const error = new Error("User not found.");
            error.message = "User not found.";
            error.status = 404;
            throw error;
        }

        if(loggedInUserId != user.id){
            const error = new Error("User is not authorized.");
            error.message = "User is not authorized.";
            error.status = 403;
            throw error;
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        return await userRepo.updateUserById(user, hashPassword);
    } catch (error) {
        throw error;
    }

}

module.exports.deleteUserById = async (id, loggedInUserId) => {
    try {
        const user = await userRepo.getUserById(id);
        if(!user) {
            const error = new Error("User not found.");
            error.message = "User not found.";
            error.status = 404;
            throw error;
        }

        if(loggedInUserId != user.id){
            const error = new Error("User is not authorized.");
            error.message = "User is not authorized.";
            error.status = 403;
            throw error;
        }
        
        return await userRepo.deleteUserById(user);
    } catch (error) {
        throw error; 
    }
}