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
        lecturer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: Lecturer,
                key: 'lecturer_id',
            },
        },
    }, {
        tableName: 'courses',
        timestamps: false,
    });

    Course.associate = (models) => {
        Course.belongsTo(models.Lecturer, { foreignKey: 'lecturer_id', as: 'lecturer' })
    }

    return Course;
}