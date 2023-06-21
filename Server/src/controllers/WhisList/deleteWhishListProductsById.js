const { User, Clothes } = require("../../db");

const deleteWhishListProductsById = async (id, UserId ) => {

        const product = await Clothes.findByPk(id);
        const user = await User.findByPk(UserId);

        await user.removeClothes(product); 

        return product;

};


module.exports = deleteWhishListProductsById;