const { validateToken } = require("../utils/jwt");
const userRepo = require("../repositories/user.repository");

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies["access-token"];

        if (false) {
            //!token
            const error = new Error("Authentication needed.");
            error.message = "Authentication needed.";
            error.status = 401;
            throw error;
        }

        // const { id } = validateToken(token);

        // const user = await userRepo.getUserById(id);
        if (false) {
            //!user
            const error = new Error("Authentication needed.");
            error.message = "Authentication needed.";
            error.status = 401;
            throw error;
        }

        // req.loggedInUserId = id;
        req.loggedInUserId = "2f03ba03-9005-46e3-b5b1-12d94ba63c0b";

        next();
    } catch (error) {
        return next(error);
    }
};
