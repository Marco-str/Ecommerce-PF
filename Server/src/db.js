
const { Sequelize } = require('sequelize');

const UserModel = require('./models/User'); 
const ClothesModel = require('./models/Clothes');

require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT,  DB_NAME, DB_DEPLOY } = process.env;



const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

// const sequelize = new Sequelize(DB_DEPLOY, {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   });

UserModel(sequelize);
ClothesModel(sequelize);

const { User, Clothes } = sequelize.models;


User.belongsToMany(Clothes, { through: "UserClothes"})
Clothes.belongsToMany(User, { through: "UserClothes"})


module.exports = {
    sequelize,
    ...sequelize.models
};