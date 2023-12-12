const userService = require("../services/user.service");
const userDTO = require("../dto/user.dto");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const userDataForRegistration = new userDTO.RegisterUserData(username, email, password);

        const { newUser, token } = await userService.register(userDataForRegistration);

        const user = new userDTO.UserData(newUser);

        return res.status(201).send({ user, token });
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

        return res.status(200).send({ user, token });
    } catch (error) {
        return next(error);
    }
};

module.exports.updateUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.loggedInUserId;
        const { oldPassword, newPassword } = req.body;

        const userDataForUpdate = new userDTO.UserDataForUpdate(oldPassword, newPassword);

        const sequelizeUser = await userService.updateUserById(
            id,
            loggedInUserId,
            userDataForUpdate.oldPassword,
            userDataForUpdate.newPassword
        );

        const updatedUser = new userDTO.UserData(sequelizeUser);
        return res.status(200).send(updatedUser);
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
        return res.status(200).send(deletedUser);
    } catch (error) {
        return next(error);
    }
};
