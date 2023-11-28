const userRepo = require("../repositories/user.repository");
const userService = require("../services/user.service");
const bcrypt = require("bcrypt");

module.exports.register = async(req, res, next) => {
    try {
        const token = await userService.register(req.body); 

        res.cookie("access-token", token, { maxAge: 3600*1000});
        return res.status(201).send("User registration successful.");

    } catch (error) {
        return next(error);
    }
};

module.exports.login = async(req, res, next) => {
    try {
        const token = await userService.login(req.body);

        res.cookie("access-token", token, { maxAge: 3600*1000});
        return res.status(200).send("User logged in successfully.");

    } catch (error) {
        return next(error);  
    }
};


module.exports.updateUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const { password } = req.body;

        await userService.updateUserById(id, userId, password);

        return res.status(200).send("User updated successfully.");
        
    } catch (error) {
        return next(error);  
    }
}

module.exports.deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        await userService.deleteUserById(id, userId);

        return res.status(200).send("User deleted successfully.");
        
    } catch (error) {
        return next(error);  
    }
}
