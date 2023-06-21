const { User } = require("../../db");
const bcrypt = require("bcryptjs");

const putUserById = async (id, changeData) => {
  console.log(changeData);
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("El usuario no existe");
    }
    const {password} = changeData;
    if (password && password!==user.password) changeData.password = await bcrypt.hash(password, 10);
    await user.update({...user,...changeData});
    return user;
  } catch (error) {

    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = putUserById;
