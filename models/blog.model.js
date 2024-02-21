const Datatypes = require("sequelize");
const sequelize = require("../utils/database");

const Blog = sequelize.define("Blog", {
    id:{
        type: Datatypes.UUID,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title:{
        type: Datatypes.TEXT,
        allowNull: false,
    },
    blogContent:{
        type: Datatypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: Datatypes.UUID,
    }
});

module.exports = Blog;