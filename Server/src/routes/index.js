const { Router } = require("express");
const router = Router();
const routesProducts = require("./routesProducts");
const routesUsers = require("./routesUsers");
const routeWhishListProduct = require("./routeWhishListProducts");
const routesPayment = require("./routesPayment");
const routesOrders = require("./routesOrders")
const fs = require('fs');
const path = require('path');

router.use("/products", routesProducts);

router.use("/users", routesUsers);

router.use("/whishListProduct", routeWhishListProduct);

router.use("/payment", routesPayment);

router.use("/orders", routesOrders)

router.get('/', (req, res) => {
    const readmePath = path.join(__dirname, '../../README.md');
    
    fs.readFile(readmePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading README file:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.set('Content-Type', 'text/plain');
        res.send(data);
      }
    });
  });

module.exports = router;
