const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/jwt");
const userDTO = require("../dto/user.dto");

module.exports.register = async ({ username, email, password }) => {
    const userByUsername = await userRepo.getUserByUsername(username);

    if (userByUsername) {
        const error = new Error("User already exists by this username.");
        error.message = "User already exists by this username.";
        error.status = 400;
        throw error;
    }

    const userByEmail = await userRepo.getUserByEmail(email);

    if (userByEmail) {
        const error = new Error("User already existsby this email.");
        error.message = "User already exists by this email.";
        error.status = 400;
        throw error;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await userRepo.createUser({ username, email, password: hashPassword });

    const token = createToken(newUser.id);
    return { newUser, token };
};

module.exports.login = async (email, password) => {
    const sequelizeUser = await userRepo.getUserByEmail(email);
    if (!sequelizeUser) {
        const error = new Error("User not found.");
        error.message = "User not found.";
        error.status = 404;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, sequelizeUser.password);
    if (!isMatch) {
        const error = new Error("Invalid credentials.");
        error.message = "Invalid credentials.";
        error.status = 400;
        throw error;
    }

    const token = createToken(sequelizeUser.id);

    return { sequelizeUser, token };
};

module.exports.updateUserById = async (id, loggedInUserId, oldPassword, newPassword) => {
    const user = await userRepo.getUserById(id);
    if (!user) {
        const error = new Error("User not found.");
        error.message = "User not found.";
        error.status = 404;
        throw error;
    }

    if (loggedInUserId != user.id) {
        const error = new Error("User is not authorized.");
        error.message = "User is not authorized.";
        error.status = 403;
        throw error;
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        const error = new Error("Invalid credentials.");
        error.message = "Invalid credentials.";
        error.status = 400;
        throw error;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);

    return await userRepo.updateUserById(user, { hashPassword });
};

module.exports.deleteUserById = async (id, loggedInUserId) => {
    const user = await userRepo.getUserById(id);
    if (!user) {
        const error = new Error("User not found.");
        error.message = "User not found.";
        error.status = 404;
        throw error;
    }

    if (loggedInUserId != user.id) {
        const error = new Error("User is not authorized.");
        error.message = "User is not authorized.";
        error.status = 403;
        throw error;
    }

    return await userRepo.deleteUserById(user);
};
