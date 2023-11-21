const Datatypes = require("sequelize");
const sequelize = require("../utils/database");
const Blog = require("../models/blog.model");

const User = sequelize.define("User", {
    id:{
        type: Datatypes.UUID,
        defaultValue: Datatypes.UUIDV4,
        allowNull: true,
        primaryKey: true,
    },
    username:{
        type: Datatypes.STRING,
        allowNull: true,
    },
    email:{
        type: Datatypes.STRING,
        allowNull: true,
    },
    password:{
        type: Datatypes.STRING,
        allowNull: true,
    },
});

User.hasMany(Blog, { foreignKey: 'userId' });
Blog.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;