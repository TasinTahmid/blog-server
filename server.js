const express = require("express");
const app = express();
const authRoutes = require("./modules/auth/auth.routes");
const sequelize = require("./utils/database");

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
    res.status(200).send("Welcome to blog-server!!!");
});

sequelize.sync()
    .then(()=>{console.log('connected successfully')})
    .catch(()=>{console.log('not conneted')});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});