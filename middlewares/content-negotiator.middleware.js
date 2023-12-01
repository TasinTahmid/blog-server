module.exports = (req, res, next) => {
    switch (req.accepts(["json", "xml", "html", "text"])) {
        case "json":
            res.type("json");
            break;
        case "xml":
            res.type("xml");
            break;
        case "html":
            res.type("html");
            break;
        case "text":
            res.type("text");
            break;
        default:
            res.type("json");
            break;
      }

    next();
};