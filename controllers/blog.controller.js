const blogService = require("../services/blog.service");
const calcLimitAndOffset = require("../utils/calculateLimitAndOffset");
const blogDTO = require("../dto/blog.dto");
const formatData = require("../utils/formatData");

module.exports.createBlog = async (req, res, next) => {
    try {
        const { title, blogContent } = req.body;
        const loggedInUserId = req.loggedInUserId;

        const newBlogData = new blogDTO.BlogDataToCreate({ title, blogContent, loggedInUserId });

        const sequelizeBlog = await blogService.createBlog(newBlogData);

        const newBlog = new blogDTO.BlogData(sequelizeBlog);
        return res.status(201).send(newBlog);
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

        const blog = await blogService.getBlogById(id);

        const blogData = new blogDTO.BlogData(blog);

        const formattedBlog = formatData(contentType, blogData);
        return res.status(200).send(formattedBlog);
    } catch (error) {
        return next(error);
    }
};

module.exports.updateBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, blogContent } = req.body;
        const loggedInUserId = req.loggedInUserId;
        const contentType = res.get("Content-Type");

        const blogData = new blogDTO.BlogDataForUpdate(title, blogContent, loggedInUserId);

        const sequelizeBlog = await blogService.updateBlogById(id, blogData);
        const updatedBlog = new blogDTO.BlogData(sequelizeBlog);
        const formattedBlog = formatData(contentType, updatedBlog);

        return res.status(200).send(formattedBlog);
    } catch (error) {
        return next(error);
    }
};

module.exports.deleteBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.loggedInUserId;
        const contentType = res.get("Content-Type");

        const sequelizeBlog = await blogService.deleteBlogById(id, loggedInUserId);
        const deletedBlog = new blogDTO.BlogData(sequelizeBlog);
        const formattedBlog = formatData(contentType, deletedBlog);

        return res.status(200).send(formattedBlog);
    } catch (error) {
        return next(error);
    }
};
