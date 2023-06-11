const { User, Clothes } = require("../../db.js");

const getUserById = async (id) => {
  

  const user = await User.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Clothes,
      },
    ],
  });

  return user;
};

module.exports = getUserById;
