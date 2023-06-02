
import axios from "axios";


export const getAllProducts = () => {
  return async function (dispatch) {
    const products = await axios.get("/products");
    dispatch({ type: 'GET_ALL_PRODUCTS', payload: products.data });
  };
};

export const getProductByName = (name) => {
  return async function (dispatch) {
    const products = await axios.get(`/products?name=${name}`);
    dispatch({ type: 'GET_BY_NAME', payload: products.data });
  };
};

export function getCategories(){
  return async function(dispatch){
      let response = await axios.get(`/categories`);
      return dispatch({
          type: 'GET_CATEGORIES',
          payload: response.data
      });
  };
};

export function orderByName(payload){
  return{
      type: 'ORDER_PRODUCTS',
      payload
  };
};


export function filterByCategory(payload){
  return{
      type: 'FILTER_BY_CATEGORY',
      payload
  };
};

export function filterByPrice(payload){
  return{
      type: 'FILTER_BY_PRICE',
      payload
  };
};


export function createPubli(newprod){
  return async function(dispatch){
      try {
          var response = await axios.post(`/product`, newprod);//pokenuevo seria el req.body de mi controller
          return console.log('prod created por redux')//dispatch({type: 'ADD_POKEMON', payload: response.data}); //en realidad no necesito este type porque mis pokemons se renderizan directamente desde mi base de datos.    
          //porq no m funciona este console.log()?
      } catch (error) {
          console.log(error.message);
          alert('no creo prod porq no quiero')
      }
     
  };
};


export function cleanMyStore(){
  return{
      type: 'CLEAN_STORE',
  }
}


export function setPage(){
  return{
      type: 'SET_PAGE',
  }
}
