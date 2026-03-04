module.exports = (req, res, next) => {
    switch (req.accepts(["json", "xml", "html", "text"])) {
        case "json":
            res.type("json");
            req.format = "json";
            break;
        case "xml":
            res.type("xml");
            req.format = "xml";
            break;
        case "html":
            res.type("html");
            req.format = "html";
            break;
        case "text":
            res.type("text");
            req.format = "text";
            break;
        default:
            res.type("json");
            req.format = "json";
            break;
    }

    next();
};
