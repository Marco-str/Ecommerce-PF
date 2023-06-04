import { GET_ALL_PRODUCTS, FILTER_BY_CATEGORY, FILTER_BY_PRICE, FILTER_BY_COLOR, RESET_FILTERS } from "../actions/actions";

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
    case FILTER_BY_CATEGORY:
      const { payload: category } = action;
      if (category === "") {
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
    case FILTER_BY_COLOR:
      const { payload: color } = action;
      if (color === "") {
        return {
          ...state,
          products: state.allProducts,
        };
      } else {
        const filteredByColorProducts = state.allProducts.filter((product) => {
          if (product.color && product.color.length > 0) {
            return product.color.some(
              (c) => c.ColorName && c.ColorName.toLowerCase() === color.toLowerCase()
            );
          }
          return false;
        });
        return {
          ...state,
          products: filteredByColorProducts,
        };
      }
    case RESET_FILTERS:
      return {
        ...state,
        products: state.allProducts,
      };
    default:
      return state;
  }
};

export default rootReducer;