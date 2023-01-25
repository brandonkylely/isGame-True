const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Subscribers extends Model {}

Subscribers.init(
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
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            autoIncrement: true,
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

module.exports = Subscribers