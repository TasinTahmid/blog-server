const userService = require("../services/user.service");
const userDTO = require("../dto/user.dto");
const formatData = require("../utils/formatData");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const userDataForRegistration = new userDTO.RegisterUserData(username, email, password);

        const { newUser, token } = await userService.register(userDataForRegistration);

        const user = new userDTO.UserData(newUser);

        const formattedResponse = formatData(req.format, { user, token });

        return res.status(201).send(formattedResponse);
    } catch (error) {
        return next(error);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userData = new userDTO.LoginUserData(email, password);

        const { sequelizeUser, token } = await userService.login(userData.email, userData.password);

        const user = new userDTO.UserData(sequelizeUser);

        const formattedResponse = formatData(req.format, { user, token });

        return res.status(200).send(formattedResponse);
    } catch (error) {
        return next(error);
    }
};

module.exports.updateUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.loggedInUserId;
        console.log("log id", loggedInUserId);
        const { oldPassword, newPassword } = req.body;

        const userDataForUpdate = new userDTO.UserDataForUpdate(oldPassword, newPassword);

        const sequelizeUser = await userService.updateUserById(
            id,
            loggedInUserId,
            userDataForUpdate.oldPassword,
            userDataForUpdate.newPassword
        );
        const updatedUser = new userDTO.UserData(sequelizeUser);

        const formattedResponse = formatData(req.format, updatedUser);

        return res.status(200).send(formattedResponse);
    } catch (error) {
        return next(error);
    }
};

module.exports.deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.loggedInUserId;

        const sequelizeUser = await userService.deleteUserById(id, loggedInUserId);

        const deletedUser = new userDTO.UserData(sequelizeUser);

        const formattedResponse = formatData(req.format, deletedUser);

        return res.status(200).send(formattedResponse);
    } catch (error) {
        return next(error);
    }
};
