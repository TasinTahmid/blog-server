const blogService = require("../services/blog.service");
const calcLimitAndOffset = require("../utils/calculateLimitAndOffset");

module.exports.createBlog = async (req, res, next) => {
    try {
        const { title, blogContent } = req.body;
        const loggedInUserId = req.loggedInUserId;

        await blogService.createBlog(title, blogContent, loggedInUserId);

        return res.status(201).send("Blog created successfully.");
    } catch (error) {
        return next(error);
    }
};

module.exports.getAllBlogs = async (req, res, next) => {
    try {
        const contentType = res.get("Content-Type");
        const { page, size } = req.query;
        const { limit, offset } = await calcLimitAndOffset(Number(page), Number(size));

        const blogList = await blogService.getAllBlogs(contentType, limit, offset);

        return res.status(200).send(blogList);
    } catch (error) {
        return next(error);
    }
};

module.exports.getBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const contentType = res.get("Content-Type");

        const blog = await blogService.getBlogById(id, contentType);

        return res.status(200).send(blog);
    } catch (error) {
        return next(error);
    }
};

module.exports.updateBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, blogContent } = req.body;
        const loggedInUserId = req.loggedInUserId;

        await blogService.updateBlogById(id, title, blogContent, loggedInUserId);

        return res.status(200).send("Blog updated successfully.");
    } catch (error) {
        return next(error);
    }
};

module.exports.deleteBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.loggedInUserId;

        await blogService.deleteBlogById(id, loggedInUserId);

        return res.status(200).send("Blog deleted successfully.");
    } catch (error) {
        return next(error);
    }
};
