const { Router } = require("express");
const router = Router();
const routesProducts = require("./routesProducts");
const routesUsers = require("./routesUsers");
const routeWhishListProduct = require("./routeWhishListProducts");

router.use("/products", routesProducts);

router.use("/users", routesUsers);

router.use("/whishListProduct", routeWhishListProduct);

module.exports = router;
