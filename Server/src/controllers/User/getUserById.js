const { User, Clothes, Orders, Reviews } = require("../../db.js");

const getUserById = async (id) => {
  

  const user = await User.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Orders,
      },
      {
        model: Clothes,
      },
      {
        model: Reviews,
      },
    ],
  });

  return user;
};

module.exports = getUserById;
