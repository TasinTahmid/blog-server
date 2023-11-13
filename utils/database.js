const Sequelize = require("sequelize");

const sequelize = new Sequelize("blog_server","root","password",{
    dialect: "mysql",
    host: "localhost"
});

sequelize.sync({force: true})
    .then(()=>{console.log('connected successfully')})
    .catch(()=>{console.log('not conneted')});

module.exports = sequelize;