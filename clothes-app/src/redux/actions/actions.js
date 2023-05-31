import axios from "axios";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const getAllProducts = () => {
  return async function (dispatch) {
    const products = await axios.get("http://localhost:3001/products");
    dispatch({ type: GET_ALL_PRODUCTS, payload: products.data });
  };
};
