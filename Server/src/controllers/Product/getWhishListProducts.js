
const { User, Clothes } = require("../../db");

const getWishlistProducts = async (id) => {
  try {
    const wishlist = await User.findOne({
      where: { id: id },
      include: {
        model: Clothes,
      }
    });

    return wishlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getWishlistProducts;
