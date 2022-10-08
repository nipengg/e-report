module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('City', {
        city_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        city_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'cities',
        timestamps: false,
    });

    return City;
}