import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const ORDER_PRODUCTS = "ORDER_PRODUCTS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_DETAIL = "GET_DETAIL";
export const SET_PAGE = "SET_PAGE";
export const CLEAN_STORE = "CLEAN_STORE";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const FILTER_BY_COLOR = "FILTER_BY_COLOR";
export const RESET_FILTERS = "RESET_FILTERS";
export const GET_USER = "GET_USER";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const products = await axios.get("/products");
      dispatch({ type: GET_ALL_PRODUCTS, payload: products.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllProductByName = (name) => {
  return async (dispatch) => {
    try {
      const products = await axios.get(`/products?name=${name}`);
      dispatch({ type: GET_BY_NAME, payload: products.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/types`);
      dispatch({ type: GET_CATEGORIES, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_PRODUCTS,
    payload,
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/products/${id}`);
      dispatch({ type: GET_DETAIL, payload: response.data });
    } catch (error) {
      console.log("Product not found");
    }
  };
};

export const filterByCategory = (category) => {
  return {
    type: FILTER_BY_CATEGORY,
    payload: category,
  };
};

export function filterByPrice(priceRange) {
  console.log(priceRange, "priceRange aaa");
  return {
    type: FILTER_BY_PRICE,
    payload: priceRange,
  };
}

export const filterByColor = (color) => {
  return {
    type: FILTER_BY_COLOR,
    payload: color,
  };
};

export function orderByPrice(priceRange) {
  return {
    type: ORDER_BY_PRICE,
    payload: priceRange,
  };
}

export const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};

export const createPost = (newprod) => {
  return async (dispatch) => {
    try {
      // const response = await axios.post(`/product`, newprod);
      console.log("Product created by Redux");
    } catch (error) {
      console.log(error.message);
      alert("This process is under development...");
    }
  };
};

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      // const response = await axios.post(`/user`, user);
      console.log("User created by Redux");
      dispatch({ type: SIGN_UP_SUCCESS, payload: user });
    } catch (error) {
      console.log(error.message);
      alert("This process is under development...");
      dispatch({ type: SIGN_UP_FAILURE, payload: error.message });
    }
  };
};

export const getUserByEmail = (email) => {
  return async (dispatch) => {
    try {
      const user = await axios.get(`/user?email=${email}`);
      dispatch({ type: GET_USER, payload: user.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanMyStore = () => {
  return {
    type: CLEAN_STORE,
  };
};

export const setPage = () => {
  return {
    type: SET_PAGE,
  };
};

export const signUpUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/signup", userData);
      const { token } = response.data;

      // Puedes almacenar el token en el local storage o en un estado global según tu necesidad
      // Ejemplo: localStorage.setItem("token", token);

      dispatch({ type: SIGN_UP_SUCCESS, payload: token });
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: SIGN_UP_FAILURE, payload: error.response.data.msg });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/login", { email, password });
      const { token } = response.data;

      // Puedes almacenar el token en el local storage o en un estado global según tu necesidad
      // Ejemplo: localStorage.setItem("token", token);

      dispatch({ type: LOGIN_SUCCESS, payload: token });
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: LOGIN_FAILURE, payload: error.response.data.msg });
    }
  };
};
