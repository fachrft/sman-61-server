const { Sequelize } = require('sequelize')
const db = require('../Config/Database.js')
const Admin = require('./admin.js')

const { DataTypes } = Sequelize;

const pojokKarya = db.define('pojok_karya', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        }
    },
    foto: {
        type: DataTypes.STRING,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        }
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        }
    }
})
Admin.hasMany(pojokKarya)
pojokKarya.belongsTo(Admin, {foreignKey: 'adminId'})

module.exports = pojokKarya