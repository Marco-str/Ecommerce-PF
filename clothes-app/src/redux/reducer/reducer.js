import { GET_ALL_PRODUCTS } from "../actions/actions";
import { FILTER_BY_GENDER } from "../actions/actions";
import { FILTER_BY_PRICE } from "../actions/actions";

const initialState = {
  products: [],
  allProducts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };
    case FILTER_BY_GENDER:
      const { payload: gender } = action;
      if (gender === 'all') {
        return {
          ...state,
          products: state.allProducts,
        };
      } else {
        const filteredProducts = state.allProducts.filter(
          (product) => product.gender === gender
        );
        return {
          ...state,
          products: filteredProducts,
        };
      }

      case FILTER_BY_PRICE:
        const { payload: priceRange } = action;
        const [minPrice, maxPrice] = priceRange;
        const filteredByPriceProducts = state.allProducts.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
        return {
          ...state,
          products: filteredByPriceProducts,
        };
      default:
        return state;
    }
  };

export default rootReducer;