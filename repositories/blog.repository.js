const { where } = require("sequelize");
const Blog = require("../models/blog.model");

const createBlog = async ({ title, blogContent, userId }) => {
    try {
        const blog = await Blog.create({ title, blogContent, userId });
        return blog;
        
    } catch (error) {
        throw error;
    }
}

const getBlogs = async () => {
    try {
        return await Blog.findAll();
        
    } catch (error) {
        throw error;
    }
}

const getBlogById = async (id) => {
    try {
        return await Blog.findOne({ where: { id } });
        
    } catch (error) {
        throw error;
    }
}

const updateCurrentBlog = async (blog, title, blogContent, userId) => {
    try {
        return await blog.update({ title, blogContent, userId });
        
    } catch (error) {
        throw error;
    }

}
const deleteCurrentBlog = async (blog) => {
    try {
        return await blog.destroy();
        
    } catch (error) {
        throw error;
    }
}

module.exports = { createBlog, getBlogs, getBlogById, updateCurrentBlog, deleteCurrentBlog };