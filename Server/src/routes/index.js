const { Router } = require("express");
const router = Router();
const routesProducts = require('./routesProducts');
const routesProductsId = require('./routesProductsId');



router.get('/', (req, res) => {
    res.send('Este va a ser el LOgin de JWT');
});

router.use('/products', routesProducts);
router.use('/products', routesProductsId);

module.exports = router;