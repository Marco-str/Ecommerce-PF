require("dotenv").config();
const mercadopago = require("mercadopago");
const { Clothes, User } = require("../../db");
const { FRONT_URL, BACK_URL } = process.env;

const createOrder = async (products, userId) => {
  mercadopago.configure({
    access_token:
      "TEST-7324911978665795-061117-ec741046ae14ae1bdfbb3cc5234e758e-1396914442",
  });
  const user = await User.findByPk(userId);
  const items = await Promise.all(
    products.map(async (product) => {
      const item = await Clothes.findByPk(product.id);
      return {
        id: product.id,
        title: item.name,
        quantity: product.quantity,
        currency_id: "USD",
        unit_price: parseInt(item.price),
      };
    })
  );
  const newOrder = await user.createOrder({
    userId,
    products: items,
  });
  var preference = {
    items,
    back_urls: {
      success: `${FRONT_URL}/success`,
      failure: `${FRONT_URL}/failure`,
      pending: `${FRONT_URL}/pending`,
    },
    notification_url: `${BACK_URL}/payment/webhook`,
    external_reference: `${newOrder.id}`,
  };

  const order = await mercadopago.preferences.create(preference);
  return order;
};

module.exports = createOrder;
