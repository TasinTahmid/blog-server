const express = require("express");
const { createNewBlog, getAllBlogs, getOneBlog, updateOneBlog, deleteOneBlog } = require("../controllers/blog.controller");
const router = express.Router();

router.post('/', createNewBlog);
router.get('/', getAllBlogs);
router.get('/:id', getOneBlog);
router.put('/:id', updateOneBlog);
// router.patch('/:id', updateOneBlogPartially);
router.delete('/:id', deleteOneBlog);

module.exports = router;