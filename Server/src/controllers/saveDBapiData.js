
const getProducts = require("./getProducts");
const { Clothes } = require("../db.js");

const getApiData = async () => {
  const dataProducts = await getProducts();
  const response = dataProducts.data;

  const validProducts = [];

  const products = response.map((product) => ({
    id: product.ItemCode,
    sizes: product.Variants[0].Sizes.map((size) => size.SizeName),
    color: product.Variants[0].ColorName,
    listPrice: product.ListPrice,
    defaultProductImage: product.DefaultProductImage,
    variantProductImage: product.Variants[0].ProductImages[0],
    categoryName: product.categoryName,
    PrimaryParentCategory: product.PrimaryParentCategory,
  }));

  validProducts.push(...products);

  return validProducts;
};

const saveDBapiData = async () => {
  try {
    const allData = await getApiData();
    await Clothes.bulkCreate(allData);
    return allData;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = saveDBapiData;
