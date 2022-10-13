const Lecturer = require("./Lecturer");

module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        course_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        course_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        semester_credit_unit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total_attendance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'courses',
        timestamps: false,
    });

    return Course;
}