const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const { createToken } = require('../utils/jwt');
const userDTO = require("../dto/user.dto");

module.exports.register = async( username, email, password ) => {
    try {
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

        const userData = new userDTO.Register(username, email, hashPassword);

        const newUser = await userRepo.createUser(userData);

        return createToken(newUser.id);   
    } catch (error) {   
        throw error;
    }
}

module.exports.login = async(email, password) => {
    try {
        const userData = new userDTO.Login(email, password);

        const user = await userRepo.getUserByEmail(userData.email);

        if(!user) {
            const error = new Error("User not found.");
            error.message = "User not found.";
            error.status = 404;
            throw error;
        }

        const isMatch = await bcrypt.compare(userData.password, user.password);
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
}

module.exports.updateUserById = async (id, loggedInUserId, oldPassword, newPassword) => {
    try {
        const user = await userRepo.getUserById(id);
        if(!user) {
            const error = new Error("User not found.");
            error.message = "User not found.";
            error.status = 404;
            throw error;
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) {
            const error = new Error("Invalid credentials");
            error.message = "Invalid credentials";
            error.status = 400;
            throw error;
        }

        if(loggedInUserId != user.id){
            const error = new Error("User is not authorized.");
            error.message = "User is not authorized.";
            error.status = 403;
            throw error;
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(newPassword, salt);

        const userData = new userDTO.UpdateUserById(hashPassword);

        return await userRepo.updateUserById(user, userData);
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