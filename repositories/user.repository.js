const User = require("../models/user.model");

const findOneUser = async (email) => {
    try {
        console.log("one")
        const user = await User.findOne({ where: { email } });
        console.log('newUser',user)
        return user;

    } catch (error) {
        console.log(error)
        return res.status(500).send({"messege": "Internal server error 1."});
        
    }
}

const createOneUser = async (username, email, hashPassword) => {
    try {
        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        });

        console.log('newUser',newUser)
        return newUser
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({"messege": "Internal server error 2."});
        
    }
    
}

module.exports = { findOneUser, createOneUser };