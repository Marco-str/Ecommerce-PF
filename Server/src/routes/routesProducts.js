const { Router } = require("express");
const router = Router();

const getProducts = require("../controllers/Product/getProducts");
const getProductById = require("../controllers/Product/getProductById");
const postProduct = require("../controllers/Product/postProduct");
const putProductById = require("../controllers/Product/putProductById");
const deleteProductById = require("../controllers/Product/deleteProductById");


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
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.post("/", async (req, res) => {
  try {
    const product = await postProduct(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await putProductById(id,req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await deleteProductById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
