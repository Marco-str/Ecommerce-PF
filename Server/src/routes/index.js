const { Router } = require("express");
const router = Router();
const routesProducts = require('./routesProducts');
const routesCategories = require('./routesCategories');



router.get('/', (req, res) => {
    res.send('Este va a ser el LOgin de JWT');
});

router.use('/products', routesProducts);
router.use('/categories', routesCategories);

module.exports = router;