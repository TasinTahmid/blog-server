const Sequelize = require("sequelize");

const sequelize = new Sequelize("blog_server","root","root",{
    dialect: "mysql",
    host: "localhost"
});

sequelize.sync()
    .then(()=>{console.log('connected successfully')})
    .catch(()=>{console.log('not conneted')});

module.exports = sequelize;