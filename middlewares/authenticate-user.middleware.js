const { validateToken } = require("../utils/jwt");
const userRepo = require("../repositories/user.repository");
const CustomError = require("../utils/createCustomeError");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new CustomError(401, "Authentication needed.");
        }

        const token = authHeader.split("Bearer ")[1];

        const { id } = validateToken(token);
        if (!id) {
            throw new CustomError(401, "Authentication needed.");
        }

        const user = await userRepo.getUserById(id);
        if (!user) {
            throw new CustomError(401, "Authentication needed.");
        }

        req.loggedInUserId = id;

        next();
    } catch (error) {
        return next(error);
    }
};
