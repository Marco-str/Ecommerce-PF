const { Reviews } = require("../../db");


const modifyReview = async (id, changeData) => {

            const review = await Reviews.findByPk(id);
            if(!review){
                throw new Error(error.message)
            }
            await review.update(changeData);
            return review;
            
        
            
        }

module.exports = modifyReview;