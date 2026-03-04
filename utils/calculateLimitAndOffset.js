const blogRepo = require("../repositories/blog.repository");

module.exports = async (page, size) => {
    const limit = !size || size <= 0 ? 6 : size;

    const totalBlogs = await blogRepo.countNumberOfBlogs();
    const pageLimit = Math.ceil(totalBlogs / limit);

    const offset =
        page > pageLimit || page <= 0 || !page ? 0 : (page - 1) * limit;

    return { limit, offset };
};
