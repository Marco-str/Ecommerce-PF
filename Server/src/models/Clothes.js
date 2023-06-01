
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define(

        "Clothes",

        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,

            },
            size: {
                type: DataTypes.ARRAY (DataTypes.JSON),
                allowNull: false,
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            listPrice: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            defaultProductImage: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            variantPrductImage: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            categoryName: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            primaryParentCategory: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
};