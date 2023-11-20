const Datatypes = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("User", {
    id:{
        type: Datatypes.UUID,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    username:{
        type: Datatypes.STRING,
        allowNull: false,
    },
    email:{
        type: Datatypes.STRING,
        allowNull: false,
    },
    password:{
        type: Datatypes.STRING,
        allowNull: false,
    },
});

module.exports = User;