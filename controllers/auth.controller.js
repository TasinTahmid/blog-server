const { registrationService, loginService } = require("../services/auth.service");

const register = async(req, res, next) => {
    try {
        const token = await registrationService(req.body); 

        res.cookie("access-token", token, { maxAge: 3600*1000});
        return res.status(201).send("User registration successful.");

    } catch (error) {
        return next(error);
    }
};

const login = async(req, res, next) => {
    try {
        const token = await loginService(req.body);

        res.cookie("access-token", token, { maxAge: 3600*1000});
        return res.status(200).send("User logged in successfully.");

    } catch (error) {
        return next(error);  
    }
};

module.exports = { register, login };