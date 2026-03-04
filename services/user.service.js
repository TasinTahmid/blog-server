const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/jwt");
const CustomError = require("../utils/createCustomeError");

module.exports.register = async (userData) => {
    const { username, email, password } = userData;
    const userByUsername = await userRepo.getUserByUsername(username);

    if (userByUsername) {
        throw new CustomError(400, "User already exists by this username.");
    }

    const userByEmail = await userRepo.getUserByEmail(email);

    if (userByEmail) {
        throw new CustomError(400, "User already exists by this email.");
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await userRepo.createUser({
        username,
        email,
        password: hashPassword,
    });

    const token = createToken(newUser.id);
    return { newUser, token };
};

module.exports.login = async (email, password) => {
    const sequelizeUser = await userRepo.getUserByEmail(email);
    if (!sequelizeUser) {
        throw new CustomError(404, "User not found.");
    }

    const isMatch = await bcrypt.compare(password, sequelizeUser.password);
    if (!isMatch) {
        throw new CustomError(400, "Invalid credentials.");
    }

    const token = createToken(sequelizeUser.id);

    return { sequelizeUser, token };
};

module.exports.updateUserById = async (
    id,
    loggedInUserId,
    oldPassword,
    newPassword
) => {
    if (loggedInUserId != id) {
        throw new CustomError(403, "User is not authorized.");
    }

    const user = await userRepo.getUserById(id);
    if (!user) {
        throw new CustomError(404, "User not found.");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new CustomError(400, "Invalid credentials.");
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);

    return await userRepo.updateUserById(user, hashPassword);
};

module.exports.deleteUserById = async (id, loggedInUserId) => {
    if (loggedInUserId != id) {
        throw new CustomError(403, "User is not authorized.");
    }

    const user = await userRepo.getUserById(id);
    if (!user) {
        throw new CustomError(404, "User not found.");
    }

    return await userRepo.deleteUserById(user);
};
