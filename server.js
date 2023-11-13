const express = require("express");
const app = express();
const authRoutes = require("./modules/auth/auth.routes");

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
    res.status(200).send("Welcome to blog-server!!!");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});