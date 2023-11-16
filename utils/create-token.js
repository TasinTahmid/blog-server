const jwt = require("jsonwebtoken");

module.exports = (username) => {
    return jwt.sign({id: username}, "secret-key");
}