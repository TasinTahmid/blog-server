const Blog = require("../models/blog.model");

module.exports.createBlog = async (blogData) => {
    return await Blog.create(blogData);
};

module.exports.getAllBlogs = async (limit, offset) => {
    return await Blog.findAll({
        limit,
        offset,
    });
};

module.exports.getBlogById = async (id) => {
    return await Blog.findOne({ where: { id } });
};

module.exports.updateBlogById = async (blog, blogData) => {
    return await blog.update(blogData);
};
module.exports.deleteBlogById = async (blog) => {
    return await blog.destroy();
};

module.exports.countNumberOfBlogs = async () => {
    return await Blog.count();
};
