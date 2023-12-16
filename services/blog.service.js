const blogRepo = require("../repositories/blog.repository");
const CustomError = require("../utils/createCustomeError");

module.exports.createBlog = async (blogData) => {
    return await blogRepo.createBlog(blogData);
};

module.exports.getAllBlogs = async (limit, offset) => {
    const sequelizeBlogList = await blogRepo.getAllBlogs(limit, offset);
    return sequelizeBlogList.map((e) => e.dataValues);
};

module.exports.getBlogById = async (id) => {
    const blog = await blogRepo.getBlogById(id);

    if (!blog) {
        throw new CustomError(404, "Blog not found.");
    }

    return blog;
};

module.exports.updateBlogById = async (id, blogData) => {
    const blog = await blogRepo.getBlogById(id);
    if (!blog) {
        throw new CustomError(404, "Blog not found.");
    }

    if (blogData.userId != blog.userId) {
        throw new CustomError(403, "User is not authoroized to updated this blog.");
    }

    return await blogRepo.updateBlogById(blog, blogData);
};

module.exports.deleteBlogById = async (id, loggedInUserId) => {
    const blog = await blogRepo.getBlogById(id);
    if (!blog) {
        throw new CustomError(404, "Blog not found.");
    }

    if (loggedInUserId != blog.userId) {
        throw new CustomError(403, "User is not authoroized to delete this blog.");
    }

    return await blogRepo.deleteBlogById(blog);
};
