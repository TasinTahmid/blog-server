const validateBlog = (blogSchema) => async (req, res, next) => {
    try {
        if (req.method == "POST") {
            await blogSchema.blogCreateSchema.validate(req.body);
        } else if (req.method == "PUT") {
            await blogSchema.blogUpdateSchema.validate(req.body);
        }

        next();
    } catch (err) {
        return res.status(400).send(err.errors[0]);
    }
};

module.exports = validateBlog;
