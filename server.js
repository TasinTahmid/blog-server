const express = require("express");
const app = express();
const authRoutes = require("./modules/auth/auth.routes");

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/v1/', v1Routes);
app.use('*', wrongRouteHandler);

app.use(erroHandler);
////

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});