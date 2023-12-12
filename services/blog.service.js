const userRepo = require("../repositories/user.repository");
const blogRepo = require("../repositories/blog.repository");
const blogDTO = require("../dto/blog.dto");
const formatData = require("../utils/formatData");

module.exports.createBlog = async (blogData) => {
    return await blogRepo.createBlog(blogData);
};

module.exports.getAllBlogs = async (contentType, limit, offset) => {
    const sequelizeBlogList = await blogRepo.getAllBlogs(limit, offset);
    const blogResponse = sequelizeBlogList.map((e) => e.dataValues);
    const blogList = new blogDTO.GetAllBlogs(blogResponse);

    return formatData(contentType, blogList);
};

module.exports.getBlogById = async (id) => {
    const blog = await blogRepo.getBlogById(id);

    if (!blog) {
        const error = new Error("Blog not found.");
        error.message = "Blog not found.";
        error.status = 404;
        throw error;
    }

    return blog;
};

module.exports.updateBlogById = async (id, blogData) => {
    const blog = await blogRepo.getBlogById(id);
    if (!blog) {
        const error = new Error("Blog not found.");
        error.message = "Blog not found.";
        error.status = 404;
        throw error;
    }

    if (blogData.userId != blog.userId) {
        const error = new Error("User is not authoroized to updated this blog.");
        error.message = "User is not authoroized to updated this blog.";
        error.status = 403;
        throw error;
    }

    return await blogRepo.updateBlogById(blog, blogData);
};

module.exports.deleteBlogById = async (id, loggedInUserId) => {
    const blog = await blogRepo.getBlogById(id);
    if (!blog) {
        const error = new Error("Blog not found.");
        error.message = "Blog not found.";
        error.status = 404;
        throw error;
    }

    if (loggedInUserId != blog.userId) {
        const error = new Error("User is not authoroized to delete this blog.");
        error.message = "User is not authoroized to delete this blog.";
        error.status = 403;
        throw error;
    }

    return await blogRepo.deleteBlogById(blog);
};
