


import axios from "axios";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const ORDER_PRODUCTS ='ORDER_PRODUCTS';
export const GET_BY_NAME='GET_BY_NAME';
export const GET_DETAIL='GET_DETAIL'
export const SET_PAGE='SET_PAGE';
export const CLEAN_STORE='CLEAN_STORE';
export const FILTER_BY_CATEGORY='FILTER_BY_CATEGORY';
export const FILTER_BY_PRICE='FILTER_BY_PRICE';


export const getAllProducts = () => {
  return async function (dispatch) {
    const products = await axios.get("http://localhost:3001/products");
    dispatch({ type: GET_ALL_PRODUCTS, payload: products.data });
  };
};

export const getAllProductByName = () => {
  return async function (dispatch) {
    const products = await axios.get("http://localhost:3001/products");
    dispatch({ type: GET_BY_NAME, payload: products.data });
  };
};

export function getCategories(){
  return async function(dispatch){
      let response = await axios.get(`/types`);
      return dispatch({
          type: GET_CATEGORIES,
          payload: response.data
      });
  };
};

export function orderByName(payload){
  return{
      type: ORDER_PRODUCTS,
      payload
  };
};

export function getDetail(id){
  return async function(dispatch){
      try{
          let json = await axios.get('/pokemons/' + id);
          return dispatch({
              type: GET_DETAIL,
              payload: json.data
          });
      }catch{
          console.log('PROD not found');
      };
  };
};


export function filterByCategory(payload){
  return{
      type: FILTER_BY_CATEGORY,
      payload
  };
};

export function filterByPrice(payload){
  return{
      type: FILTER_BY_PRICE,
      payload
  };
};


export function createPubli(pokenuevo){
  return async function(dispatch){
      try {
          var response = await axios.post(`/pokemons`, pokenuevo);//pokenuevo seria el req.body de mi controller
          return console.log('pokemon created por redux')//dispatch({type: 'ADD_POKEMON', payload: response.data}); //en realidad no necesito este type porque mis pokemons se renderizan directamente desde mi base de datos.    
          //porq no m funciona este console.log()?
      } catch (error) {
          console.log(error.message);
          alert('no creo pokemon porq no quiero')
      }
     
  };
};


export function cleanMyStore(){
  return{
      type: CLEAN_STORE,
  }
}


export function setPage(){
  return{
      type: SET_PAGE,
  }
}
