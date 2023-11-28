const blogService = require("../services/blog.service");

module.exports.createBlog = async(req, res, next) => {
    try {
        const { title, blogContent } = req.body;
        const loggedInUserId = req.loggedInUserId;

        const newBlog = await blogService.createBlog(title, blogContent, loggedInUserId);

        return res.status(201).send(newBlog);

    } catch (error) {
        return next(error);
    }
};

module.exports.getAllBlogs = async (req, res, next) => {
    try {
        const blogList = await blogService.getAllBlogs();

        return res.status(200).send(blogList);
        
    } catch (error) {
        return next(error);  
    }
}

module.exports.getBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const blog = await blogService.getBlogById(id);

        return res.status(200).send(blog);
    } catch (error) {
        return next(error);  
    }
}

module.exports.updateBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, blogContent } =  req.body;
        const loggedInUserId = req.loggedInUserId;

        const updatedBlog = await blogService.updateBlogById(id, title, blogContent, loggedInUserId);

        return res.status(200).send(updatedBlog);
        
    } catch (error) {
        return next(error);  
    }
}

module.exports.deleteBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.loggedInUserId;

        const deletedBlog = await blogService.deleteBlogById(id, loggedInUserId);

        return res.status(200).send(deletedBlog);
        
    } catch (error) {
        return next(error);  
    }
}
