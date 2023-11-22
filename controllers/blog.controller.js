const Blog = require("../models/blog.model");
const { findUserById } = require("../repositories/user.repository");
const { createBlog, getBlogs, getBlogById, updateCurrentBlog, deleteCurrentBlog } = require("../repositories/blog.repository");

const createNewBlog = async(req, res, next) => {
    try {
        const { title, blogContent, userId } = req.body;

        const newBlog = await createBlog({ title , blogContent, userId });

        return res.status(201).send(newBlog);

    } catch (error) {
        return next(error);
    }
};

const getAllBlogs = async (req, res, next) => {
    try {
        const blogList = await getBlogs();

        return res.status(200).send(blogList);
        
    } catch (error) {
        return next(error);  
    }
}

const getOneBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        const blog = await getBlogById(id);
        if(!blog) {
            const error = new Error("Blog not found.");
            error.message = "Blog not found.";
            error.status = 404;
            throw error;
        }

        return res.status(200).send(blog);
        
    } catch (error) {
        return next(error);  
    }
}

const updateOneBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, blogContent } =  req.body;

        const blog = await getBlogById(id);
        if(!blog) {
            const error = new Error("Blog not found.");
            error.message = "Blog not found.";
            error.status = 404;
            throw error;
        }

        const userId = blog.userId;

        const updatedBlog = await updateCurrentBlog(blog, title, blogContent, userId);

        return res.status(200).send(updatedBlog);
        
    } catch (error) {
        return next(error);  
    }
}

const deleteOneBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        const blog = await getBlogById(id);
        if(!blog) {
            const error = new Error("Blog not found.");
            error.message = "Blog not found.";
            error.status = 404;
            throw error;
        }

        const deletedBlog = await deleteCurrentBlog(blog);

        return res.status(200).send(deletedBlog);
        
    } catch (error) {
        return next(error);  
    }
}

module.exports = { createNewBlog, getAllBlogs, getOneBlog, updateOneBlog, deleteOneBlog };
