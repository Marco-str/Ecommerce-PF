const server = require("./src/app");
const sequelize = require("./src/db.js");
require('dotenv').config();
require("./src/db.js");

server.listen(process.env.PORT, () => {
 
 sequelize.sync({ alter: true })
 .then(() => {
    console.log("Conectado a la base de datos");
  });

  console.log(`Servidor en el puerto  http://localhost:${process.env.PORT}`);
});