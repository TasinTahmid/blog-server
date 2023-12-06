const { validateToken } = require("../utils/jwt");
const userRepo = require("../repositories/user.repository");

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies["access-token"];

        if (!token) {
            const error = new Error("Authentication needed.");
            error.message = "Authentication needed.";
            error.status = 401;
            throw error;
        }

        const { id } = validateToken(token);

        const user = await userRepo.getUserById(id);
        if (!user) {
            const error = new Error("Authentication needed.");
            error.message = "Authentication needed.";
            error.status = 401;
            throw error;
        }

        req.loggedInUserId = id;

        next();
    } catch (error) {
        return next(error);
    }
};
