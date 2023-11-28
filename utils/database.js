const Sequelize = require("sequelize");

const sequelize = new Sequelize("blog_server", "root", "root", {
    dialect: "mysql",
    host: "localhost",
});

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("connected successfully");
    })
    .catch((e) => {
        console.log("not conneted");
        console.log('from db.js',e)
    });

module.exports = sequelize;
