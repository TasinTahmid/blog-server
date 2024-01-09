const Blog = require("../models/blog.model");

module.exports.createBlog = async (blogData) => {
    const blog = await Blog.create(blogData);
    console.log("repo...", blog);
    return blog;
};

module.exports.getAllBlogs = async (limit, offset) => {
    const temp = await Blog.findAndCountAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });
    return temp;
};

module.exports.getBlogsByUserId = async (id, limit, offset) => {
    return await Blog.findAndCountAll({
        limit,
        offset,
        where: { userId: id },
        order: [["createdAt", "DESC"]],
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
