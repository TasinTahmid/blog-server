const { countNumberOfBlogs } = require("../repositories/blog.repository");

module.exports = async(page, size) => {
    const limit = (!size || size <= 0) ? 5: size;

    const totalBlogs = await countNumberOfBlogs();
    const pageLimit = Math.ceil(totalBlogs/limit);

    const offset = (page > pageLimit || page <= 0 || !page) ? 0 : (page - 1) * limit; 
    
    return { limit, offset };
};