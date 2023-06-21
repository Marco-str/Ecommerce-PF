const { Clothes , Reviews } = require("../../db");

const getProductById = async function (id) {
  // const product = await Clothes.findByPk(id);
  // return product;
  const user = await Clothes.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Reviews,
      }
    ],
  });

  return user;
};


module.exports = getProductById;
