const { registrationService, loginService } = require("../services/auth.service");

const register = async(req, res, next) => {
    try {
        const returnValue = await registrationService(req.body, next); 
        console.log("token", returnValue)

        if(returnValue?.err) return res.status(returnValue.status).send({"messege": returnValue.err});

        res.cookie("access-token", returnValue?.token, { maxAge: 3600*1000});
        return res.status(201).send("User registration successful.");

    } catch (error) {
        console.log("err in regi controller", error);
        next(error);
        // return res.status(500).send({"messege": "Internal server error44."});
    }
};

const login = async(req, res, next) => {
    try {
        const returnValue = await loginService(req.body);
        if(returnValue.err) return res.status(returnValue.status).send({"messege": returnValue.err});

        res.cookie("access-token", returnValue.token, { maxAge: 3600*1000});
        return res.status(200).send("User logged in successfully.");

    } catch (error) {
        console.log(error.messege);
        return res.status(500).send({"messege": "Internal server error."});    
    }
};

module.exports = { register, login };