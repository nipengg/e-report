const City = require("./City");

module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        student_nim: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },

        student_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        student_age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        student_gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        student_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        student_place_of_birth: {
            type: DataTypes.STRING,
            allowNull: false,
            refrences: {
                model: City,
                key: "city_id"
            },
        },

        student_date_of_birth: {
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
    }, {
        tableName: 'students',
        timestamps: false,
    });

    Student.associate = (models) => {
        Student.belongsTo(models.City, { foreignKey: 'city_id', as: "city" })
    }

    return Student;
}