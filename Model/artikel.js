const { Sequelize } = require('sequelize')
const db = require('../Config/Database.js')
const Admin = require('./admin.js')

const { DataTypes } = Sequelize;

const Artikel = db.define('artikel', {
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
    keterangan: {
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
Admin.hasMany(Artikel)
Artikel.belongsTo(Admin, {foreignKey: 'adminId'})

module.exports = Artikel