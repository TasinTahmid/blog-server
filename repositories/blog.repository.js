const Blog = require("../models/blog.model");

module.exports.createBlog = async (title, blogContent, userId) => {
    try {
        const blog = await Blog.create({ title, blogContent, userId });
        return blog;
        
    } catch (error) {
        throw error;
    }
}

module.exports.getAllBlogs = async () => {
    try {
        return await Blog.findAll();
        
    } catch (error) {
        throw error;
    }
}

module.exports.getBlogById = async (id) => {
    try {
        return await Blog.findOne({ where: { id } });
        
    } catch (error) {
        throw error;
    }
}

module.exports.updateBlogById = async (blog, title, blogContent) => {
    try {
        return await blog.update({ title, blogContent });
        
    } catch (error) {
        throw error;
    }

}
module.exports.deleteBlogById = async (blog) => {
    try {
        return await blog.destroy();
        
    } catch (error) {
        throw error;
    }
}

