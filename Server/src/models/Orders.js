const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Orders",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      products: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Pending",
      },
      paymentMetod: {
        type: DataTypes.STRING,
        defaultValue: "Mercado Pago",
      },
      total: {
        type: DataTypes.FLOAT,
      },
      paymentId: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      createdAt: "date",
      updatedAt: false,
    }
  );
};
