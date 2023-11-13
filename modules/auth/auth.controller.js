const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../user/user.model");

const register = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        const emailExists = await User.findOne({
            where: { email }
        });

        if(emailExists){
            return res.status(400).send({"messege": "User already exists with this email."});
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        });

        res.status(201).send(newUser);
    } catch (error) {
        console.log(error.messege);
        res.status(500).send({"messege": "Internal server error."});
    }
};

const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if(!user) return res.status(404).send({"messege": "User not found."});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).send({"messege": "Invalid credentials."});
        
        const token = jwt.sign({id: user.id}, "secret-key");

        res.status(200).send({ token });

    } catch (error) {
        console.log(error.messege);
        res.status(500).send({"messege": "Internal server error."});    
    }
};

module.exports = { register, login };