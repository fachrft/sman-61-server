const { Sequelize } = require("sequelize");
const db = require("../Config/Database.js");
const Admin = require("./admin.js");

const { DataTypes } = Sequelize;

const Majalah = db.define("majalah", {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        },
    },
    tahun_terbit: {
        type: DataTypes.INTEGER,
        allowNullValues: false,
        validate: {
            notEmpty: true,
        },
    },
    foto: {
        type: DataTypes.STRING,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        },
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        },
    },
});
Admin.hasMany(Majalah);
Majalah.belongsTo(Admin, { foreignKey: "adminId" });

module.exports = Majalah;
