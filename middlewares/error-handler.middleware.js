const formatData = require("../utils/formatData");

module.exports = (err, req, res, next) => {
    console.log("error from global handler", err);

    const errStatus = err.status || 500;
    const errMessege = {};
    errMessege.message = err.status ? err.message : "Internal server error";

    const formattedErrorMessege = formatData(req.format, errMessege);

    return res.status(errStatus).send(formattedErrorMessege);
};
