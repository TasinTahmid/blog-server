const express = require("express");
const controller = require("../controllers/blog.controller");
const authenticateUser = require("../middlewares/authenticate-user.middleware");

const router = express.Router();

router.post('/', authenticateUser, controller.createBlog);
router.get('/', controller.getAllBlogs);
router.get('/:id', controller.getBlogById);
router.put('/:id', authenticateUser, controller.updateBlogById);
// router.patch('/:id', updateOneBlogPartially);
router.delete('/:id', authenticateUser, controller.deleteBlogById);

module.exports = router;