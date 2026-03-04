const blogService = require("../services/blog.service");
const calcLimitAndOffset = require("../utils/calculateLimitAndOffset");
const blogDTO = require("../dto/blog.dto");
const formatData = require("../utils/formatData");

module.exports.createBlog = async (req, res, next) => {
    try {
        const { title, blogContent } = req.body;
        const loggedInUserId = req.loggedInUserId;

        const newBlogData = new blogDTO.BlogDataToCreate({
            title,
            blogContent,
            loggedInUserId,
        });

        const sequelizeBlog = await blogService.createBlog(newBlogData);
        const newBlog = new blogDTO.BlogData(sequelizeBlog);

        const formattedBlog = formatData(req.format, newBlog);

        return res.status(201).send(formattedBlog);
    } catch (error) {
        return next(error);
    }
};

module.exports.getAllBlogs = async (req, res, next) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = await calcLimitAndOffset(Number(page), Number(size));

        const countAndBlogList = await blogService.getAllBlogs(limit, offset);
        const blogList = new blogDTO.GetAllBlogs(countAndBlogList.blogList);

        // const formattedCountAndBlogList = formatData(req.format, blogList);

        return res.status(200).send(countAndBlogList);
    } catch (error) {
        return next(error);
    }
};

module.exports.getBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const sequelizeBlog = await blogService.getBlogById(id);
        // const blog = new blogDTO.BlogData(sequelizeBlog);

        // const formattedBlog = formatData(req.format, blog);

        return res.status(200).send(sequelizeBlog);
    } catch (error) {
        return next(error);
    }
};

module.exports.updateBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { title, blogContent } = req.body;
        const loggedInUserId = req.loggedInUserId;

        const blogData = new blogDTO.BlogDataForUpdate(title, blogContent, loggedInUserId);

        const sequelizeBlog = await blogService.updateBlogById(id, blogData);
        const updatedBlog = new blogDTO.BlogData(sequelizeBlog);

        const formattedBlog = formatData(req.format, updatedBlog);

        return res.status(200).send(formattedBlog);
    } catch (error) {
        return next(error);
    }
};

module.exports.deleteBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.loggedInUserId;

        const sequelizeBlog = await blogService.deleteBlogById(id, loggedInUserId);
        const deletedBlog = new blogDTO.BlogData(sequelizeBlog);

        const formattedBlog = formatData(req.format, deletedBlog);

        return res.status(200).send(formattedBlog);
    } catch (error) {
        return next(error);
    }
};
