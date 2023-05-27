const express = require('express');

//import the connection object
const db = require('./config/connection');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Now Listening on Port ${PORT}`))
});

