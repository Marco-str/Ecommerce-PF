const axios = require("axios");
const getProducts = require("../controllers/getProducts");

const saveDBapiData = async function (data) {

const data = await getProducts();
const response = data.data.products;

const products = response.map((product) => {
    return {
        id : product.ItemCode,
        PrimaryParentCategory: product.PrimaryParentCategory,
        categoryName: product.categoryName,
        defaultProductImage: product.defaultProductImage,
        variantPrductImage: product.variantPrductImage,
        listPrice: product.listPrice,
        


    }

})
}


module.exports = saveDBapiData;