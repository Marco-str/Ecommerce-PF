const axios = require("axios");
require("dotenv").config();
// const { API_KEY } = process.env;

const getProductById = async function (id) {
  const response = await axios.request({
    method: "GET",
    url: `https://apidojo-forever21-v1.p.rapidapi.com/products/v2/detail?id=${id}`,
    headers: {
      "X-RapidAPI-Key": "5cb16b518emsh43b2799f3ae9f2cp1c309ejsna6cd07c2a424",
      "X-RapidAPI-Host": "apidojo-forever21-v1.p.rapidapi.com",
    },
  });
  console.log(response.data); // Verifica si se obtienen los datos correctamente
    return response;
};

module.exports = getProductById;



