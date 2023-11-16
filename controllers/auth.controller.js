const { registrationService } = require("../services/registration.service");
const { loginService } = require("../services/login.service");
const { parseUserInfoForRegistration, parseUserInfoForLogin } = require("../dto/user.dto");

const register = async(req, res) => {
    try {
        const { username, email, password } = parseUserInfoForRegistration(req.body);

        const token = await registrationService(username, email, password); 

        if(!token) return res.status(400).send({"messege": "User already exists."});

        res.cookie("access-token", token, { maxAge: 3600*1000});
        return res.status(201).send("User registration successful.");

    } catch (error) {
        console.log(error.messege);
        return res.status(500).send({"messege": "Internal server error."});
    }
};

const login = async(req, res) => {
    try {
        const { email, password } = parseUserInfoForLogin(req.body);

        const returnValue = await loginService(email, password);
        if(returnValue.err) return res.status(returnValue.status).send({"messege": returnValue.err});

        res.cookie("access-token", returnValue.token, { maxAge: 3600*1000});
        return res.status(200).send("User logged in successfully.");

    } catch (error) {
        console.log(error.messege);
        return res.status(500).send({"messege": "Internal server error."});    
    }
};

module.exports = { register, login };