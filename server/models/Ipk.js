const { DataTypes } = require("sequelize");
const Student = require("./Student");

module.exports = (sequelize, DataTypes) => {
    const Ipk = sequelize.define("Ipk", {
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
        total_score: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        tableName: "ipks",
        timestamps: false,
    });
    Ipk.associate = (models) => {
        Ipk.belongsTo(models.Student, { foreignKey: 'nim', as: 'student' })
    }
    return Ipk;
}