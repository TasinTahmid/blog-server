const yup = require("yup");

const blogCreateSchema = yup.object({
    title: yup.string().min(1, "Title must contain at least one word.").required(),
    blogContent: yup.string().min(1, "Content must contain at least one word.").required(),
});

const blogUpdateSchema = yup.object({
    title: yup.string().min(1, "Title must contain at least one word."),
    blogContent: yup.string().min(1, "Content must contain at least one word."),
});

module.exports = { blogCreateSchema, blogUpdateSchema };