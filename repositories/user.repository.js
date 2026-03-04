const User = require("../models/user.model");

module.exports.getUserByUsername = async (username) => {
    return await User.findOne({ where: { username } });
};

module.exports.getUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

module.exports.getUserById = async (id) => {
    return await User.findOne({ where: { id } });
};

module.exports.createUser = async (userData) => {
    return await User.create(userData);
};

module.exports.updateUserById = async (user, newHashedPassword) => {
    const updval = await user.update({ password: newHashedPassword });
    return updval;
};

module.exports.deleteUserById = async (user) => {
    return await user.destroy();
};
