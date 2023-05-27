// include the Express.js library
const express = require('express');
//include our routes
const routes = require('./controllers');
//import the connection object
const db = require('./config/connection');
//import the sequalize models
const sequelize = require('./config/connection');

//initialize the app
const app = express();
//set the port
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use sequalize to sync the database and then start the server
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Now Listening on Port ${PORT}`))
});

