module.exports = (err, req, res) => {
    console.log("error from global handler", err);

    const errStatus = err.status || 500;
    const errMsg = err.status ? err.message : "Internal server error";

    return res.status(errStatus).send(errMsg);
};
