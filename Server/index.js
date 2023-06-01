const server = require("./src/app");

const {sequelize} = require("./src/db.js");
require('dotenv').config();
require("./src/db.js");
const saveDBapiData = require("./src/controllers/saveDBapiData");


sequelize.sync({ force: true })
.then(() => {
server.listen(process.env.PORT, () => {

    
  saveDBapiData();
 
    console.log("Conectado a la base de datos");
    
    console.log(`Servidor en el puerto  http://localhost:${process.env.PORT}`);
  });

});