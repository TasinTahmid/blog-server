const userRepo = require("../repositories/user.repository");
const blogRepo = require("../repositories/blog.repository");
const blogDTO = require("../dto/blog.dto");

module.exports.createBlog = async(title, blogContent, loggedInUserId) => {
    try {
        const blogData = new blogDTO.CreateBlog(title, blogContent, loggedInUserId);
        const user = await userRepo.getUserById(blogData.loggedInUserId);
        
        if(!user){
            const error = new Error("User Id is not valid.");
            error.message = "User Id is not valid.";
            error.status = 400;
            throw error;
        }

        return await blogRepo.createBlog(blogData);
    } catch (error) {
        throw error;
    }
}

module.exports.getAllBlogs = async() => {
    try {
        return await blogRepo.getAllBlogs();
    } catch (error) {
        throw error;
    }
}

module.exports.getBlogById = async (id) => {
    try {
        const blog = await blogRepo.getBlogById(id);
        if(!blog) {
            const error = new Error("Blog not found.");
            error.message = "Blog not found.";
            error.status = 404;
            throw error;
        }

        const blogData = new blogDTO.GetBlogById(blog);
        return blogData;
    } catch (error) {
        throw error;
    }

}

module.exports.updateBlogById = async(id, title, blogContent, loggedInUserId) => {
    try {
        const blog = await blogRepo.getBlogById(id);
        if(!blog) {
            const error = new Error("Blog not found.");
            error.message = "Blog not found.";
            error.status = 404;
            throw error;
        }

        if(loggedInUserId != blog.userId){
            const error = new Error("User is not the owner of this blog.");
            error.message = "User is not the owner of this blog.";
            error.status = 403;
            throw error;
        }

        const blogData = new blogDTO.UpdateBlogById(title, blogContent)
        return await blogRepo.updateBlogById(blog, blogData);
    } catch (error) {
        throw error;
    }
}

module.exports.deleteBlogById = async (id, loggedInUserId) => {
    try {
        const blogData = new blogDTO.DeleteBlogById(id);
        const blog = await blogRepo.getBlogById(blogData.id);
        if(!blog) {
            const error = new Error("Blog not found.");
            error.message = "Blogg not found.";
            error.status = 404;
            throw error;
        }

        if(loggedInUserId != blog.userId){
            const error = new Error("User is not the owner of this blog.");
            error.message = "User is not the owner of this blog.";
            error.status = 403;
            throw error;
        }

        return await blogRepo.deleteBlogById(blog);
    } catch (error) {
        throw error;
    }
}

