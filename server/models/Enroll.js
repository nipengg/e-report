const { DataTypes } = require("sequelize");
const Student = require("./Student")
const Course = require("./Course")
const Lecturer = require("./Lecturer")
const Class = require("./Class")

module.exports = (sequelize, DataTypes) => {
    const Enroll = sequelize.define('Enroll', {
        enroll_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nim: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: Student,
                key: "student_nim"
            },
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: Course,
                key: 'course_id'
            },
        },
        lecturer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: Lecturer,
                key: 'lecturer_id'
            },
        },
        class_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refremces: {
                model: Class,
                key: 'class_id'
            },
        },
        status: {
            type: DataTypes.ENUM(['active', 'inactive']),
            allowNull: true,
        },
    }, {
        tableName: 'enrolls',
        timestamps: false,
    });
    Enroll.associate = (models) => {
        Enroll.belongsTo(models.Student, { foreignKey: 'nim', as: 'student' })
        Enroll.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' } )
        Enroll.belongsTo(models.Class, { foreignKey: 'class_id', as: 'class' })
        Enroll.belongsTo(models.Lecturer, { foreignKey: 'lecturer_id', as: 'lecturer' })
    }

    return Enroll;
}