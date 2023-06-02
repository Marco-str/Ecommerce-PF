// import { GET_ALL_PRODUCTS } from "../actions/actions";
// import { GET_CATEGORIES } from "../actions/actions";
// import { ORDER_PRODUCTS } from "../actions/actions";
// import { GET_BY_NAME } from "../actions/actions";
// import { GET_DETAIL } from "../actions/actions";

const initialState = {
  products: [],
  allProducts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };

      case "GET_BY_NAME":
        if (!action.payload.length) {
          console.log('Prod not Found');
          return alert("Prod not Found");
        }
        return {
          ...state,
          products: action.payload,
        };

    default:
      return state;
  }
};

export default rootReducer;