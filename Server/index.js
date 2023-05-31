const server = require("./src/app");
require('dotenv').config();

server.listen(process.env.PORT, () => {
  console.log(`Servidor en el puerto  http://localhost:${process.env.PORT}`);
});