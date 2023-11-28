const express = require("express");
const controller = require("../controllers/blog.controller");
const authenticateUser = require("../middlewares/authenticate-user.middleware");
const blogSchema = require("../Schemas/blog.schema");
const validateBlog = require("../middlewares/blog-validation.middleware");

const router = express.Router();

router.get('/', controller.getAllBlogs);
router.get('/:id', controller.getBlogById);
router.post('/', authenticateUser, validateBlog(blogSchema), controller.createBlog);
router.put('/:id', authenticateUser, validateBlog(blogSchema), controller.updateBlogById);
// router.patch('/:id', updateOneBlogPartially);
router.delete('/:id', authenticateUser, controller.deleteBlogById);

module.exports = router;