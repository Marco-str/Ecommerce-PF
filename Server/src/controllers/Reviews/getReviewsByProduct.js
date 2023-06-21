const { Reviews, Clothes, User } = require('../../db');



const getReviewsByProduct = async (id) => {
   const reviews= await Reviews.findAll({
        // where: {
        //     productId: id
        // }
    })

    return reviews;
};

module.exports = getReviewsByProduct;