const { Clothes } = require("../db");
const { Op } = require("sequelize");


const getProductsByName = async function (name) {

  const products = await Clothes.findOne({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
    },
  });
  
  return products;
};

module.exports = getProductsByName;
