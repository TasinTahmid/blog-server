const userRepo = require("../repositories/user.repository");
const blogRepo = require("../repositories/blog.repository");
const blogDTO = require("../dto/blog.dto");
const formatData = require("../utils/formatData");

module.exports.createBlog = async (title, blogContent, loggedInUserId) => {
    const blogData = new blogDTO.CreateBlog(title, blogContent, loggedInUserId);

    return await blogRepo.createBlog(blogData);
};

module.exports.getAllBlogs = async (contentType, limit, offset) => {
    const sequelizeBlogList = await blogRepo.getAllBlogs(limit, offset);
    const blogResponse = sequelizeBlogList.map((e) => e.dataValues);
    const blogList = new blogDTO.GetAllBlogs(blogResponse);

    return formatData(contentType, blogList);
};

module.exports.getBlogById = async (id, contentType) => {
    const blog = await blogRepo.getBlogById(id);

    if (!blog) {
        const error = new Error("Blog not found.");
        error.message = "Blog not found.";
        error.status = 404;
        throw error;
    }

    const blogData = new blogDTO.GetBlogById(blog);

    const formattedBlogData = formatData(contentType, blogData);

    return formattedBlogData;
};

module.exports.updateBlogById = async (id, title, blogContent, loggedInUserId) => {
    const blog = await blogRepo.getBlogById(id);
    if (!blog) {
        const error = new Error("Blog not found.");
        error.message = "Blog not found.";
        error.status = 404;
        throw error;
    }

    if (loggedInUserId != blog.userId) {
        const error = new Error("User is not authoroized to updated this blog.");
        error.message = "User is not authoroized to updated this blog.";
        error.status = 403;
        throw error;
    }

    const blogData = new blogDTO.UpdateBlogById(title, blogContent);
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
