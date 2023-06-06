require("dotenv").config();
const UserModel = require('./models/User');
const ClothesModel = require('./models/Clothes');
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const axios = require("axios");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

// const sequelize = new Sequelize(DB_DEPLOY, {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   });

UserModel(sequelize);
ClothesModel(sequelize);

const { User, Clothes } = sequelize.models;

Clothes.belongsToMany(User, {through: 'cart'});
User.belongsToMany(Clothes, {through: 'cart'});

const options = {
  method: "GET",
  url: "https://apidojo-forever21-v1.p.rapidapi.com/products/v2/list",
  headers: {
    "X-RapidAPI-Key": "5cb16b518emsh43b2799f3ae9f2cp1c309ejsna6cd07c2a424",
    "X-RapidAPI-Host": "apidojo-forever21-v1.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then((data)=>data.data)
  .then(({CatalogProducts})=> CatalogProducts)
  .then((data) => {
    return data.map(
      ({
        DisplayName,
        ListPrice,
        PrimaryParentCategory,
        ItemCode,
        Variants,
        DefaultProductImage,
        CategoryName,
        Description
      }) => {
        return {
          id: ItemCode,
          name: DisplayName,
          color: Variants,
          price: ListPrice,
          image: DefaultProductImage,
          category: CategoryName,
          parentCategory : PrimaryParentCategory,          
          description: Description,
        };
      }
    );
  })
  .then((data) => {
    Clothes.bulkCreate(data);
  })
  .then(() => console.log("Base de datos cargada"))
  .catch((error) => {
    console.log(error.message);
  });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
