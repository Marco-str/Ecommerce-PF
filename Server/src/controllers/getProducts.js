const {Clothes} = require('../db');
require("dotenv").config();


const getProducts = async function () {
  const products = await Clothes.findAll();
  return products;
};

module.exports = getProducts; 