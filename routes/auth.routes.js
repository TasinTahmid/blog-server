const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const userRegistrationSchema = require("../validations/user-registration.schema");
const userLoginSchema = require("../validations/user-login.schema");
const validateRegistrationUser = require("../middlewares/register-validation.middleware");
const validateLoginUser = require("../middlewares/login-validation.middleware");

router.post('/register', validateRegistrationUser(userRegistrationSchema), register);
router.post('/login', validateLoginUser(userLoginSchema), login);

module.exports = router;