const { Clothes } = require("../db");

const getProductsByName = async function (name) {
  console.log("Nombre recibido:", name); 

  const products = await Clothes.findAll({
    where: {
      name: name,
    },
  });
  return products;
};

module.exports = getProductsByName;
