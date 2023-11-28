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
        console.log("req path:",req.method)/////////
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
        const loggedInUserId = req.loggedInUserId;
        const { password } = req.body;

        console.log("req path:",req.method)//////
        await userService.updateUserById(id, loggedInUserId, password);

        res.cookie("access-token", null, { maxAge: 0});
        return res.status(200).send("User updated successfully.");
        
    } catch (error) {
        return next(error);  
    }
}

module.exports.deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.loggedInUserId;

        await userService.deleteUserById(id, loggedInUserId);

        return res.status(200).send("User deleted successfully.");
        
    } catch (error) {
        return next(error);  
    }
}
