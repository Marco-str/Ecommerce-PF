const { Router } = require("express");
const router = Router();
const getProducts = require("../controllers/getProducts");



router.get("/", async (req, res) => {
  try {
    const product = await getProducts();
    console.log(product.data);
    res.status(200).send(product.data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

module.exports = router;
