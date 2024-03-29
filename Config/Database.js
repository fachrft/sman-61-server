const Sequelize = require('sequelize');
const mysql2 = require('mysql2');
const dotenv = require("dotenv");
dotenv.config()

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME , process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2,
})

module.exports = db