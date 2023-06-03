import { GET_ALL_PRODUCTS, FILTER_BY_GENDER, FILTER_BY_PRICE, FILTER_BY_CATEGORY } from "../actions/actions";

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
    case FILTER_BY_CATEGORY:
      const { payload: category } = action;
      if (category === 'all') {
        return {
          ...state,
          products: state.allProducts,
        };
      } else {
        const filteredByCategoryProducts = state.allProducts.filter(
          (product) => product.category === category
        );
        return {
          ...state,
          products: filteredByCategoryProducts,
        };
      }
    default:
      return state;
  }
};

export default rootReducer;