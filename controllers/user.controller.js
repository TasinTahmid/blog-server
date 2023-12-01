const userService = require("../services/user.service");

module.exports.register = async(req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const token = await userService.register(username, email, password); 

        res.cookie("access-token", token, { maxAge: 3600*1000});
        return res.status(201).send("User registration successful.");

    } catch (error) {
        return next(error);
    }
};

module.exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        const token = await userService.login(email, password);

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
        const { oldPassword, newPassword } = req.body;

        await userService.updateUserById(id, loggedInUserId, oldPassword, newPassword);

        res.cookie("access-token", null, { maxAge: 0});
        return res.status(200).send("User updated successfully.");
        
    } catch (error) {
        return next(error);  
    }
};

module.exports.deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.loggedInUserId;

        await userService.deleteUserById(id, loggedInUserId);

        return res.status(200).send("User deleted successfully.");
        
    } catch (error) {
        return next(error);  
    }
};
