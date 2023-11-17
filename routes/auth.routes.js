const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const userSchema = require("../Schemas/user.schema");
const validateUser = require("../middlewares/user-validation.middleware");

router.post('/register', validateUser(userSchema), register);
router.post('/login', validateUser(userSchema), login);

module.exports = router;