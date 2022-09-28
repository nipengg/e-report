module.exports = (sequelize, DataTypes) => {
    const Lecturer = sequelize.define('Lecturer', {
        lecturer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        lecturer_name: {
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
        }
    }, {
        tableName: 'lecturers',
        timestamps: false,
    });

    return Lecturer;
}