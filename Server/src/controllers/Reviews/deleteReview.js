const { Reviews } = require("../../db");

const deleteReview = async (id) => {
    try {
        const review = await Reviews.findByPk(id);
        if (!review) {
        throw new Error("La review no existe");
        }
        await review.destroy();
        return review;
    } catch (error) {
        throw new Error(error.message);
    }
    }

module.exports = deleteReview;