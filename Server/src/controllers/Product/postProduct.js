const { Clothes } = require("../../db");

const postProduct = async (
 { id,
  name,
  color,
  price,
  image,
  category,
  parentCategory,
  description}
) => {
  const product = await Clothes.create({
    id,
    name,
    color,
    price,
    image,
    category,
    parentCategory,
    description,
  });
  return product;
};

module.exports = postProduct;
