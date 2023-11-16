
const validateUser = (userSchema => async (req, res, next) => {
    try {
        await userSchema.validate(req.body);
        return next();
        
    } catch (err) {
        return res.status(400).send(err.errors[0]);
    }
});

module.exports = validateUser;

