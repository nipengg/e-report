const { DataTypes } = require("sequelize");
const Student = require("./Student")
const Course = require("./Course")

module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define('Score', {
        id: {
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
                key: 'nim',
            },
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: Course,
                key: 'course_id'
            },
        },
        score: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
    }, {
        tableName: 'scores',
        timestamps: false,
    });
    Score.associate = (models) => {
        Score.belongsTo(models.Student, { foreignKey: 'nim', as: 'student' })
        Score.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' } )
    }
    return Score;
}