// const Sequelize = require('sequelize');

// // Enable access to .env variables
// require('dotenv').config();

// // Use environment variables to connect to database
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
//   }
// );

// module.exports = sequelize;

const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); // this will load all the variables from your .env file to process.env

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;

