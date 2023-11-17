module.exports = (error, req, res, next) => {
    console.log("error from global handler")
    return res.status(500).send("Internal server error66666666.");
}