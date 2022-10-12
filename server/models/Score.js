const Enroll = require("./Enroll")

module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define('Score', {
        score_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        score_semester: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        enroll_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: Enroll,
                key: "enroll_id"
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
        Score.belongsTo(models.Enroll, { foreignKey: 'enroll_id', as: 'enroll' })
    }
    return Score;
}