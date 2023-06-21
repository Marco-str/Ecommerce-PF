const { Clothes } = require("../../db");

const postProduct = async ({
  id,
  name,
  color,
  price,
  image,
  category,
  parentCategory,
  description,
  isAvaible,
  stock,
}) => {
  const product = await Clothes.create({
    id,
    name,
    color,
    price,
    image,
    category,
    parentCategory,
    description,
    isAvaible,
    stock,
  });
  return product;
};

module.exports = postProduct;
