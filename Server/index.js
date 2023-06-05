const server = require("./src/app");
const {conn} = require("./src/db.js");
require('dotenv').config();
require("./src/db.js");

conn.sync({ force: true })
.then(() => {
server.listen(3001, () => {    
    console.log("Conectado a la base de datos");    
    console.log(`Servidor en el puerto  http://localhost:3001`);
  });
});