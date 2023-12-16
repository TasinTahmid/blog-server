const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const authenticateUser = require("../middlewares/authenticate-user.middleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.patch("/:id", authenticateUser, controller.updateUserById);
router.delete("/:id", authenticateUser, controller.deleteUserById);

module.exports = router;
