const { Router } = require("express");
const router = Router();
const routesProducts = require("./routesProducts");

router.get("/", (req, res) => {
  res.send("Este va a ser el LOgin de JWT");
});

router.use("/products", routesProducts);

module.exports = router;
