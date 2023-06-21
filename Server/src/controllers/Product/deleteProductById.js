const { Clothes } = require("../../db");

const deleteProductById = async (id) => {
  try {
    const product = await Clothes.findByPk(id);
    if (!product) {
      throw new Error("El producto no existe");
    }

    await product.destroy();
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = deleteProductById;
