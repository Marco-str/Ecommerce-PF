const { User } = require("../../db");

const putUserById = async (id, changeData) => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('El usuario no existe');
      }
  
      await user.update(changeData);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

    module.exports = putUserById;