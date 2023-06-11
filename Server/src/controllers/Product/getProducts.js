const { Op } = require("sequelize");
const { Clothes } = require("../../db");

const getProducts = async function (name) {
  if (name) {
    const products = await Clothes.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    if (products.length === 0) {
      throw new Error("No se encontraron productos");
    }
    return products;
  } else {
    const products = await Clothes.findAll();
    return products;
  }
};

module.exports = getProducts;
