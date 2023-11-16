const yup = require("yup");

const userSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
});

module.exports = userSchema;