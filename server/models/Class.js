module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define('Class', {
        class_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        class_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        total_student: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'classes',
        timestamps: false,
    });

    return Class;
}