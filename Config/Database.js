const Sequelize = require('sequelize');

const db = new Sequelize('sman61', 'root', '' , {
    host: 'localhost',
    dialect : 'mysql'
})

module.exports = db