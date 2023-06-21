const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {   
    sequelize.define(
        "Reviews",
        {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true,
        // },
        // userId: {
        //     type: DataTypes.INTEGER,
        // },
        // productId: {
        //     type: DataTypes.INTEGER,
        // },
        review: {
            type: DataTypes.TEXT,
        },
        rating: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            defaultValue: '5',
        },
        date: {
            type: DataTypes.DATE,
        },
        },
        {
        timestamps: false,
        }
    );
    }