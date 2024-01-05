const { Sequelize } = require('sequelize')
const db = require('../Config/Database.js')

const { DataTypes } = Sequelize;

const Admin = db.define("admin", {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNullValues: true,
        validate: {
            notEmpty: true,
            len: [3, 100],
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        },
    },
    secret_key: {
        type: DataTypes.STRING,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = Admin
