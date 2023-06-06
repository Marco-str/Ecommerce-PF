const { Router } = require("express");
const router = Router();
const routesProducts = require("./routesProducts");
const routesUsers = require("./routesUsers");



router.use("/products", routesProducts);

router.use("/users", routesUsers);

module.exports = router;
