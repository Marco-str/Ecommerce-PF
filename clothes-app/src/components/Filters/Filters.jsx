import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  filterByPrice,
  resetFilters,
  orderByPrice,
} from "../../redux/actions/actions";
import styles from "./Filters.module.css";

const Filters = ({ setprice }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [orderBy, setOrderBy] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    const categories = products.map((product) => product.category);
    const uniqueCategories = Array.from(new Set(categories));
    setUniqueCategories(uniqueCategories);
  }, [products]);

  const handleResetFilter = () => {
    setSelectedCategory("");
    setPriceRange([0, 1000]);
    dispatch(resetFilters());
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    dispatch(filterByCategory(selectedCategory));
  };

  const handleMinPriceChange = (event) => {
    const minPrice = parseInt(event.target.value, 10);
    setPriceRange([minPrice, priceRange[1]]);
  };

  const handleMaxPriceChange = (event) => {
    const maxPrice = parseInt(event.target.value, 10);
    setPriceRange([priceRange[0], maxPrice]);
  };

  const handleFilterByPrice = () => {
    dispatch(filterByPrice(priceRange, orderBy));
    dispatch(filterByCategory(selectedCategory));
  };

  const handleOrderByPrice = (event) => {
    const selectedOrder = event.target.value;
    setOrderBy(selectedOrder);
    dispatch(orderByPrice(selectedOrder));
  };

  return (
    <div className={styles["filter-container"]}>
      <div className={styles["filter-section"]}>
        <h4 className={styles["categories"]}>Categories</h4>
        <select
          className={styles["select"]}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option className={styles["all"]} value="">
            All categories
          </option>
          {uniqueCategories.map((category) => {
            const newString = category.replace(/_/g, " ");
            const transformedCategory =
              newString.charAt(0).toUpperCase() + newString.slice(1);
            return (
              <option
                className={styles["category"]}
                value={category}
                key={category}
              >
                {transformedCategory}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles["filter-section"]}>
        <select
          className={styles["select2"]}
          value={orderBy}
          onChange={handleOrderByPrice}
          name="price"
          id="price"
        >
          <option value="asc">Lower</option>
          <option value="des">Higher</option>
        </select>
      </div>
      
      <div className={styles["filter-section"]}>
        <div className={styles["price-input"]}>
          <h4 className={styles["priceRange"]}>Price Range</h4>
          <span className={styles["span"]}>From:</span>
          <input
            type="number"
            className={styles["input"]}
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            min={0}
            max={priceRange[1]}
            key="minPrice"
          />
          <span className={styles["span"]}>Up to:</span>
          <input
            className={styles["input"]}
            type="number"
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            min={priceRange[0]}
            max={1000}
            key="maxPrice"
          />

          <button className={styles["button"]} onClick={handleFilterByPrice}>
            Apply
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------------- */}

      {/* --------------------------------------------------------------- */}
      <div className={styles["filter-section"]}>
        <button className={styles["restFiltros"]} onClick={handleResetFilter}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
