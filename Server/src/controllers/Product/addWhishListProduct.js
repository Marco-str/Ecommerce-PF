const {Clothes, User} = require("../../db");


const addWhishListProduct = async (id, UserId) => {
try{

  const newWishProduct = await Clothes.findByPk(id);
  const user = await User.findByPk(UserId);
  
  await user.addClothes(newWishProduct);
  
  return newWishProduct;

} catch (error) {

  throw new Error("No se pudo agregar el producto a tu lista de deseos");
}

}

module.exports = addWhishListProduct;