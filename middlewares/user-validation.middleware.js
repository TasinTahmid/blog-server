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
        return res.status(400).send(err.errors[0]);
    }
};

module.exports = validateUser;
