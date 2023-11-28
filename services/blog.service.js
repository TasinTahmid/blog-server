const userRepo = require("../repositories/user.repository");
const blogRepo = require("../repositories/blog.repository");

module.exports.createBlog = async(title, blogContent, userId) => {
    try {
        const user = await userRepo.getUserById(userId);
        
        if(!user){
            const error = new Error("User Id is not valid.");
            error.message = "User Id is not valid.";
            error.status = 400;
            throw error;
        }

        return await blogRepo.createBlog({ title, blogContent, userId });
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

        return blog;
    } catch (error) {
        throw error;
    }

}

module.exports.updateBlogById = async(id, title, blogContent, userId) => {
    try {
        const blog = await blogRepo.getBlogById(id);
        if(!blog) {
            const error = new Error("Blog not found.");
            error.message = "Blog not found.";
            error.status = 404;
            throw error;
        }

        console.log(userId, blog.userId)
        if(userId != blog.userId){
            const error = new Error("User is not the owner of this blog.");
            error.message = "User is not the owner of this blog.";
            error.status = 403;
            throw error;
        }

        return await blogRepo.updateBlogById(blog, title, blogContent);
    } catch (error) {
        throw error;
    }
}

module.exports.deleteBlogById = async (id, userId) => {
    try {
        const blog = await blogRepo.getBlogById(id);
        if(!blog) {
            const error = new Error("Blog not found.");
            error.message = "Blogg not found.";
            error.status = 404;
            throw error;
        }

        if(userId != blog.userId){
            console.log("throwing");
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

