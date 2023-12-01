const express = require("express");
const app = express();
require("dotenv").config();
const v1Routes = require("./routes");
const wrongRouteHandler = require("./allHandlers/routeHandlers/wrongRouteHandler");
const erroHandler = require("./middlewares/error-handler.middleware");
const cookieParser = require("cookie-parser");
const contentNegotiator = require("./middlewares/content-negotiator.middleware");

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use(contentNegotiator);
app.use("/api/v1/", v1Routes);
app.use("*", wrongRouteHandler);

app.use(erroHandler);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
