const { Reviews } = require('../../db');


const getAllReviews = async (id) => {
    const allReviews = await Reviews.findAll({
        where: {
            ClotheId: id
        }
    });
    return allReviews;

};

module.exports = getAllReviews;
