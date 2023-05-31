const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index");
require("dotenv").config();

const server = express();
server.name = "API";
server.use(morgan("dev"));

server.use((req, res, next) => {
  //middleware para dejar pasar las solicitudes de cualquiera
  res.header(
    "Access-Control-Allow-Origin",
    `http://localhost:${process.env.PORT}`
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use("/", routes); //por aqui pasan todas las endpoint

module.exports = server;
