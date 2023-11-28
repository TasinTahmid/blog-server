class CreateBlog {
    constructor(title, blogContent, loggedInUserId){
        this.title = title;
        this.blogContent = blogContent;
        this.userId = loggedInUserId;
    }
}

class GetBlogById {
    constructor(blog){
        this.id = blog.id;
        this.title = blog.title;
        this.blogContent = blog.blogContent;
        this.userId = blog.userId;
    }
}

class UpdateBlogById {
    constructor(title, blogContent){
        this.title = title;
        this.blogContent = blogContent;
    }
}

class DeleteBlogById {
    constructor(id){
        this.id = id;
    }
}

module.exports = { CreateBlog, GetBlogById, UpdateBlogById, DeleteBlogById };