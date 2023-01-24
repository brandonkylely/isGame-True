const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Subscribers extends Model {}

Subscribers.init(
<<<<<<< HEAD
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, 
        username: {
            type: DataTypes.STRING,
            // prevents null values
            allowNull: false,
            // will only allow alphanumeric characters
            validate: {
                isAlphanumeric: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // must be longer than 6 characters
            validate: {
                len: [6],
            },
        },

=======
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
>>>>>>> df040a67f2725d867a32e7bf6ccd8173866f4117
    },
    username: {
      type: DataTypes.STRING,
      // prevents null values
      allowNull: false,
      // will only allow alphanumeric characters
      validate: {
        isAlphanumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // must be longer than 6 characters
      validate: {
        len: [6]
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'subscribers'
  }
);

module.exports = Subscribers;
