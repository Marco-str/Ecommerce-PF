const { Router } = require("express");
const router = Router();
const routesProducts = require('./routesProducts');

router.use('/products',routesProducts);

module.exports = router;