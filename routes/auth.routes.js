const express = require("express");
const router = express.Router();
const constroller = require("../controllers/auth.controller");

router.post('/register', constroller.register);
router.post('/login', constroller.login);

module.exports = router;