const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getProducts = async function () {
  const options = {
    method: "GET",
    url: "https://apidojo-forever21-v1.p.rapidapi.com/products/v2/list",
    headers: {
      "X-RapidAPI-Key": "5cb16b518emsh43b2799f3ae9f2cp1c309ejsna6cd07c2a424",
      "X-RapidAPI-Host": "apidojo-forever21-v1.p.rapidapi.com",
    },
  };
    const response = await axios.request(options);
    return response;
};

module.exports = getProducts; 