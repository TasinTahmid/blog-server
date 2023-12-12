class BlogDataToCreate {
    constructor(blog) {
        this.title = blog.title;
        this.blogContent = blog.blogContent;
        this.userId = blog.loggedInUserId;
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

class BlogData {
    constructor(blog) {
        this.id = blog.id;
        this.title = blog.title;
        this.blogContent = blog.blogContent;
        this.userId = blog.userId;
    }
}

class BlogDataForUpdate {
    constructor(title, blogContent, userId) {
        this.title = title;
        this.blogContent = blogContent;
        this.userId = userId;
    }
}

module.exports = { BlogDataToCreate, GetAllBlogs, BlogData, BlogDataForUpdate };
