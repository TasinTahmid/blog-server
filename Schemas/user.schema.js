const yup = require("yup");

const userRegistrationSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
});

const userLoginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

module.exports = { userRegistrationSchema, userLoginSchema };
