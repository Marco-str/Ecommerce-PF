const { Router } = require("express");
const axios = require("axios");

const router = Router();

// Ruta para obtener la lista de categorías
router.get("/", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://apidojo-forever21-v1.p.rapidapi.com/categories/v2/list",
    headers: {
      "X-RapidAPI-Key": "5cb16b518emsh43b2799f3ae9f2cp1c309ejsna6cd07c2a424",
      "X-RapidAPI-Host": "apidojo-forever21-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;