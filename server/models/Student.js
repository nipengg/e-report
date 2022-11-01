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
        },

        student_date_of_birth: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        major: {
            type: DataTypes.ENUM(['CS', 'BC', 'DKV']),
            allowNull: false,
        }
    }, {
        tableName: 'students',
        timestamps: false,
    });

    return Student;
}