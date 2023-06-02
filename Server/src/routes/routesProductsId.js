const express = require("express");
const router = express.Router();
const getProductById = require("../controllers/getProductById");
const { API_KEY } = process.env;

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);
    if (product.data) {
      console.log (product.data);
    res.status(200).send(product.data);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});


module.exports = router;
