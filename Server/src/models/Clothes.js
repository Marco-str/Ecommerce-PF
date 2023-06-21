const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Clothes",

    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://res.cloudinary.com/finalproject123/image/upload/v1686800930/Dummy-Default_paxnhf.jpg",
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isAvaible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 25,
      },
    },
    {
      timestamps: false,
    }
  );
};
