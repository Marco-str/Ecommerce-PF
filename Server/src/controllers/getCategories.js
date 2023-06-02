const axios = require("axios");

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
  console.log(response.data);
} catch (error) {
  console.error(error);
}
