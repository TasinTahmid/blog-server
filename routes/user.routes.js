const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const authenticateUser = require("../middlewares/authenticate-user.middleware");
const userSchema = require("../Schemas/user.schema");
const validateUser = require("../middlewares/user-validation.middleware");

router.post("/register", validateUser(userSchema), controller.register);
router.post("/login", validateUser(userSchema), controller.login);
router.patch("/:id", validateUser(userSchema), authenticateUser, controller.updateUserById);
router.delete("/:id", authenticateUser, controller.deleteUserById);

module.exports = router;
