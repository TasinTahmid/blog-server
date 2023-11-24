const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");


const updateUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const { password } = req.body;

        const user = await userRepo.findUserById(id);
        console.log("serasuser",user)
        if(!user) {
            const error = new Error("User not found.");
            error.message = "User not found.";
            error.status = 404;
            throw error;
        }

        console.log(userId, user.id)
        if(userId != user.id){
            const error = new Error("User is not authorized.");
            error.message = "User is not authorized.";
            error.status = 403;
            throw error;
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const updatedUser = await userRepo.updateUserById(user, hashPassword);

        return res.status(200).send(updatedUser);
        
    } catch (error) {
        return next(error);  
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.userId;


        const user = await userRepo.findUserById(id);
        console.log("serasuser",user)
        if(!user) {
            const error = new Error("User not found.");
            error.message = "User not found.";
            error.status = 404;
            throw error;
        }

        console.log(userId, user.id)
        if(userId != user.id){
            const error = new Error("User is not authorized.");
            error.message = "User is not authorized.";
            error.status = 403;
            throw error;
        }

        const deletedUser = await userRepo.deleteUserById(user);

        return res.status(200).send(deletedUser);
        
    } catch (error) {
        return next(error);  
    }
}

module.exports = { updateUserById, deleteUserById };