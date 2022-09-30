module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('City', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'cities',
        timestamps: false,
    });

    return City;
}