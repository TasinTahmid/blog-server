const Sequelize = require("sequelize");

const sequelize = new Sequelize("blog_server","root","password",{
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;