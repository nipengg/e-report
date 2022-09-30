const { DataTypes } = require("sequelize");
const Course = require("./Course");
const City = require("./City");
const Class = require("./Class")

module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        nim: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        place_of_birth: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: City,
                key: "city_id"
            },
        },
        class_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: Class,
                key: "class_id"
            },
        },


    }, {
        tableName: 'students',
        timestamps: false,
    });

    Student.associate = (models) => {
        Student.belongsTo(models.City, { foreignKey: 'city_id', as: "city" })
        Student.belongsTo(models.Class, { foreignKey: "class_id", as: "class" })
    }

    return Student;
}