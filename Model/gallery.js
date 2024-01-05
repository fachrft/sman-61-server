const { Sequelize } = require('sequelize')
const db = require('../Config/Database.js')
const Admin = require('./admin.js')

const { DataTypes } = Sequelize;

const Gallery = db.define('gallery', {
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
        allowNullValues: false,
        validate: {
            notEmpty: true,
        }
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        }
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNullValues: false,
        validate: {
            notEmpty: true,
        }
    }
})
Admin.hasMany(Gallery)
Gallery.belongsTo(Admin, {foreignKey: 'adminId'})

module.exports = Gallery