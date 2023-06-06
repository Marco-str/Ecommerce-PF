const {Clothes} = require('../db');
require("dotenv").config();


const getProductById = async function (id) {
  const product = await Clothes.findByPk(id);
  return product;
};

module.exports = getProductById; 

