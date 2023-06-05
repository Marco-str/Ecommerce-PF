const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");
const bodyParser = require("body-parser");

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); //REQ = PUT, POST parse URL req.params y lo convierte en un JSON en el body
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use((req, res, next) => {
  //middleware para dejar pasar las solicitudes de cualquiera
  res.header("Access-Control-Allow-Origin", `http://localhost:3000`);

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
console.log("sali del ultimo middleware");

server.use(routes); //por aqui pasan todas las endpoint

module.exports = server;
