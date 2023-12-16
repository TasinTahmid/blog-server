const express = require("express");
const router = express.Router();
const userRoutes = require("../routes/user.routes");
const blogRoutes = require("../routes/blog.routes");
const userSchema = require("../Schemas/user.schema");
const validateUser = require("../middlewares/user-validation.middleware");
const authenticateUser = require("../middlewares/authenticate-user.middleware");
const blogSchema = require("../Schemas/blog.schema");
const validateBlog = require("../middlewares/blog-validation.middleware");

router.use("/users", validateUser(userSchema), userRoutes);
router.use("/blogs", validateBlog(blogSchema), blogRoutes);

module.exports = router;
