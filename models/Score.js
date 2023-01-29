const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Score extends Model {}

Score.init(
  {
    scoreValue: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'score'
  }
);

module.exports = Score;
