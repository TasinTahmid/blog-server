const Datatypes = require("sequelize");
const sequelize = require("../../utils/database");

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

module.exports = User;