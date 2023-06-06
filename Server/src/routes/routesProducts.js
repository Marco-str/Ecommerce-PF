const { Router } = require("express");
const router = Router();
const  getProducts   = require("../controllers/getProducts");
const getProductById = require("../controllers/getProductById");


router.get("/", async (req, res) => {
  const { name } = req.query;

 try {

  const products = await getProducts(name);
  res.status(200).json(products);

 } catch (error) {
  res.status(400).send(error.message);
 }
});


router.get("/:id", async (req, res) => {
  const {id} = req.params;

  try {

    const product = await getProductById(id);
    res.status(200).json(product);

  } catch (error) {
    
    res.status(400).send(error.message);
  }
});




module.exports = router;
