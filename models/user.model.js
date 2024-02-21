const Datatypes = require("sequelize");
const sequelize = require("../utils/database");
const Blog = require("../models/blog.model");

const User = sequelize.define("User", {
    id: {
        type: Datatypes.UUID,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    email: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false,
    },
});

User.hasMany(Blog, { foreignKey: "userId" });
Blog.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
