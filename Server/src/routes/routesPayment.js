const { Router } = require("express");
const createOrder = require("../controllers/Payments/createOrder");
const receiveWebHook = require("../controllers/Payments/receiveWebHook");

const router = Router();

router.post("/create-order", async (req, res) => {
  const { products, userId } = req.body;

  try {
    const payment = await createOrder(products, userId);
    res.status(200).json({ redirect: payment.response.init_point });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/webhook", receiveWebHook);

module.exports = router;
