const express = require("express");
const router = express.Router();
const authRoutes = require("../routes/auth.routes");
const userRoutes = require("../routes/user.routes");
const blogRoutes = require("../routes/blog.routes");

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;