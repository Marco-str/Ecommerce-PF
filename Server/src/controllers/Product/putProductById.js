const { Clothes } = require ("../../db");

const putProductById = async (id, changeData) => {
    try {
      const product = await Clothes.findByPk(id);
      if (!product) {
        throw new Error('El producto no existe');
      }
  
      await product.update(changeData);
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

    module.exports = putProductById;