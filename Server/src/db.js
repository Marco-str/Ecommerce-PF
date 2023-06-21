require("dotenv").config();
const UserModel = require("./models/User");
const ClothesModel = require("./models/Clothes");
const OrdersModel = require("./models/Orders");
const ReviewsModel = require("./models/Reviews");
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, API_KEY, DB_DEPLOY } =
  process.env;
const axios = require("axios");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

UserModel(sequelize);
ClothesModel(sequelize);
OrdersModel(sequelize);
ReviewsModel(sequelize);

const { User, Clothes, Orders, Reviews } = sequelize.models;

Clothes.belongsToMany(User, { through: "cart" });
User.belongsToMany(Clothes, { through: "cart" });

User.hasMany(Orders);
Orders.belongsTo(User);

User.hasMany(Reviews);       // Un usuario puede tener muchas reseñas
Reviews.belongsTo(User);     // Una reseña pertenece a un usuario

Clothes.hasMany(Reviews);    // Una prenda puede tener muchas reseñas
Reviews.belongsTo(Clothes);  // Una reseña pertenece a una prenda

const options = {
  method: "GET",
  url: "https://apidojo-forever21-v1.p.rapidapi.com/products/v2/list",
  headers: {
    "X-RapidAPI-Key": "4b193210cbmsh44487b758f8fceep113191jsnfb3c7a9ef6b8",
    "X-RapidAPI-Host": "apidojo-forever21-v1.p.rapidapi.com",
  },
};

Clothes.findAll()
  .then((product) => product.length)
  .then((length) => {
    if (length >= 48) console.log("Database already loaded");
    else
      axios
        .request(options)
        .then((data) => data.data)
        .then(({ CatalogProducts }) => CatalogProducts)
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
              Description,
            }) => {
              return {
                id: ItemCode,
                name: DisplayName,
                color: Variants,
                price: ListPrice,
                image: DefaultProductImage,
                category: CategoryName,
                parentCategory: PrimaryParentCategory,
                description: Description,
              };
            }
          );
        })
        .then((data) => {
          Clothes.bulkCreate(data);
        })
        .then(() => console.log("Database was successfully loaded"));
  })
  .catch((error) => {
    console.log(error.message);
  });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};