const server = require("./src/app");
const { conn } = require("./src/db.js");
require("dotenv").config();
require("./src/db.js");
const PORT = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("Conectado a la base de datos");
    console.log(`Servidor en el puerto  http://localhost:${PORT}`);
  });
});
