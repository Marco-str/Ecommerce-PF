const { Reviews, User, Clothes } = require('../../db.js');


const createReview = async (UserId, ClotheId, review, rating, date) => {
   
      // Obtener el usuario y la prenda correspondientes
      const user = await User.findByPk(UserId);
      const clothes = await Clothes.findByPk(ClotheId);
  
      if (!user || !clothes) {
        throw new Error('Usuario o prenda no encontrados');
      }
      // Crear la reseña asociada al usuario y a la prenda
      const reviews = await Reviews.create({
        review,
        rating,
        date,
        UserId,
        ClotheId,
      });
  
      return reviews;
  };

    module.exports = createReview;

