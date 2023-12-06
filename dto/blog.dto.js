class CreateBlog {
    constructor(title, blogContent, loggedInUserId) {
        this.title = title;
        this.blogContent = blogContent;
        this.userId = loggedInUserId;
    }
}

class GetAllBlogs {
    constructor(blogList) {
        this.blogList = blogList.map((blog) => {
            const obj = {};
            obj.id = blog.id;
            obj.title = blog.title;
            obj.blogContent = blog.blogContent;
            obj.userId = blog.userId;
            return obj;
        });
    }
}

class GetBlogById {
    constructor(blog) {
        console.log("in dto");
        this.id = blog.id;
        this.title = blog.title;
        this.blogContent = blog.blogContent;
        this.userId = blog.userId;
    }
}

class UpdateBlogById {
    constructor(title, blogContent) {
        this.title = title;
        this.blogContent = blogContent;
    }
}

class DeleteBlogById {
    constructor(id) {
        this.id = id;
    }
}

module.exports = { CreateBlog, GetAllBlogs, GetBlogById, UpdateBlogById, DeleteBlogById };
