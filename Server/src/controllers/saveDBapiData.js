const axios = require("axios");
const getProducts = require("../controllers/getProducts");

const saveDBapiData = async function () {

const dataProducts = await getProducts();
    const response = dataProducts.data;

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