const CustomError = require("../utils/createCustomeError");

const validateUser = (userSchema) => async (req, res, next) => {
    try {
        if (req.path == "/register") {
            await userSchema.userRegistrationSchema.validate(req.body);
        } else if (req.path == "/login") {
            await userSchema.userLoginSchema.validate(req.body);
        } else if (req.method == "PATCH") {
            await userSchema.userUpdateSchema.validate(req.body);
        }

        next();
    } catch (err) {
        console.log("valditaion..", typeof err.errors[0]);
        const validationError = new CustomError(400, err.errors[0]);
        next(validationError);
    }
};

module.exports = validateUser;
