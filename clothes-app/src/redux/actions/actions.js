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
export const ADD_CART = "ADD_CART";
export const DELETE_CART = "DELETE_CART";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_USER_ALL = "GET_USER_ALL";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";
export const ID_USER = "ID_USER";
export const CONSULTA_SI_INICIO = "CONSULTA_SI_INICIO";
export const ACTIVE = "ACTIVE";
export const LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE";
export const GOOGLE = "GOOGLE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const GET_FAVORITE = "GET_FAVORITE";
export const GET_CART = "GET_CART";
export const UPDATE_CART = "UPDATE_CART";
export const SET_FAVORITES = "SET_FAVORITES";
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID";
export const CREATE_ORDER = "CREATE_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      const user = await axios.get(`/users/${userId}`);
      dispatch({ type: GET_USER, payload: user.data });
    } catch (error) { }
  };
};

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const products = await axios.get("/products");
      dispatch({ type: GET_ALL_PRODUCTS, payload: products.data });
    } catch (error) { }
  };
};

export const getAllProductByName = (name) => {
  return async (dispatch) => {
    try {
      const products = await axios.get(`/products?name=${name}`);
      dispatch({ type: GET_BY_NAME, payload: products.data });
    } catch (error) { }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/types`);
      dispatch({ type: GET_CATEGORIES, payload: response.data });
    } catch (error) { }
  };
};

/* Add favorite */
export const addFavorite = (character) => {
  return {
    type: ADD_FAVORITE,
    payload: character,
  };
};

export const deleteFavorite = (productId) => {
  return {
    type: DELETE_FAVORITE,
    payload: productId,
  };
};

export const getFavorites = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/whishListProduct/${id}`);
      return dispatch({
        type: GET_FAVORITE,
        payload: res.data.Clothes,
      })
    } catch (error) {

    }
  }
}
/* ------------------ */

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
    } catch (error) { }
  };
};

export const filterByCategory = (category) => {
  return {
    type: FILTER_BY_CATEGORY,
    payload: category,
  };
};

export function filterByPrice(priceRange) {
  return {
    type: FILTER_BY_PRICE,
    payload: priceRange,
  };
}

export function orderByPrice(priceRange) {
  return {
    type: ORDER_BY_PRICE,
    payload: priceRange,
  };
}

export const filterByColor = (color) => {
  return {
    type: FILTER_BY_COLOR,
    payload: color,
  };
};

export const resetFilters = () => ({
  type: RESET_FILTERS,
});

export const createPost = (newprod) => {
  return async (dispatch) => {
    try {
      // const response = await axios.post(`/product`, newprod);
    } catch (error) {
      alert("This process is under development...");
    }
  };
};

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      // const response = await axios.post(`/user`, user);

      dispatch({ type: SIGN_UP_SUCCESS, payload: user });
    } catch (error) {
      alert("This process is under development...");
      dispatch({ type: SIGN_UP_FAILURE, payload: error.message });
    }
  };
};

export const getUserAll = () => {
  return async (dispatch) => {
    try {
      const user = await axios.get(`/users`);
      dispatch({ type: GET_USER_ALL, payload: user.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    const user = await axios.get(`/users/${id}`);
    dispatch({ type: GET_USER_BY_ID, payload: user.data });
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

export const idUser = (id) => {
  return {
    type: ID_USER,
    payload: id,
  };
};

export const signUpUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/signup", userData);
      const { token } = response.data;
      dispatch({ type: SIGN_UP_SUCCESS, payload: token });
    } catch (error) {
      dispatch({ type: SIGN_UP_FAILURE, payload: error.response.data.msg });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/login", { email, password });
      const { token } = response.data;
      dispatch({ type: LOGIN_SUCCESS, payload: token });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.response.data.msg });
    }
  };
};

export const addCart = (producto) => {
  //  localStorage.setItem("carritoLS", JSON.stringify(producto));
  // console.log(`producto: ${producto}`);
  return {
    type: ADD_CART,
    payload: producto,
  };
};

export const deleteCart = (array) => {
  localStorage.setItem("carritoLS", JSON.stringify(array));
  return {
    type: DELETE_CART,
    payload: array,
  };
};

export const updatedCart = (array) => {
  localStorage.setItem("carritoLS", JSON.stringify(array));
  return {
    type: UPDATE_CART,
    payload: array,
  };
};

export const getCart = () => {
  const producto = JSON.parse(localStorage.getItem("carritoLS"));
  return {
    type: GET_CART,
    payload: producto,
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/products/${id}`);
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
    }
  };
};

export const consultaSiIniciado = (e) => {
  return {
    type: CONSULTA_SI_INICIO,
    payload: e,
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/users/${id}`);
      dispatch({ type: DELETE_USER_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
    }
  };
};

export const loginWithGoogle = (e) => {
  return {
    type: LOGIN_WITH_GOOGLE,
    payload: e,
  };
};

export const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  payload: favorites,
});

export const google = (e) => {
  return {
    type: GOOGLE,
    payload: e,
  };
};

export const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/orders");
      dispatch({ type: GET_ALL_ORDERS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrderById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/orders/${id}`);
      dispatch({ type: GET_ORDER_BY_ID, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};
