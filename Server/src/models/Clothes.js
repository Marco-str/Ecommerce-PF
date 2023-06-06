
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define(

        "Clothes",

        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            color: {
                type: DataTypes.ARRAY (DataTypes.JSON),
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            parentCategory: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description:{
                type: DataTypes.TEXT,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    );
};