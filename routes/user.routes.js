const express = require("express");
const router = express.Router();
const { updateUserById, deleteUserById } = require("../controllers/user.controller");
const authenticateUser = require("../middlewares/authenticate-user.middleware");


router.patch('/:id', authenticateUser, updateUserById);
router.delete('/:id', authenticateUser, deleteUserById);

module.exports = router;