const express = require("express");
const { createNewBlog, getAllBlogs, getOneBlog, updateOneBlog, deleteOneBlog } = require("../controllers/blog.controller");
const authenticateUser = require("../middlewares/authenticate-user.middleware");
const router = express.Router();

router.post('/', authenticateUser, createNewBlog);
router.get('/', getAllBlogs);
router.get('/:id', getOneBlog);
router.put('/:id', authenticateUser, updateOneBlog);
// router.patch('/:id', updateOneBlogPartially);
router.delete('/:id', authenticateUser, deleteOneBlog);

module.exports = router;