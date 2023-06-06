import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  filterByPrice,
  resetFilters,
} from "../../redux/actions/actions";
import styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    // Obtener las categorías únicas de los productos
    const categories = products.map((product) => product.category);
    const uniqueCategories = Array.from(new Set(categories));
    setUniqueCategories(uniqueCategories);
  }, [products]);

  // const newUniqueCategories = uniqueCategories.map((item) => {
  //   const newString = item.replace(/_/g, " ");
  //   return newString.charAt(0).toUpperCase() + newString.slice(1);
  // });

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
    dispatch(filterByPrice(priceRange));
  };

  return (
    <div className={styles["filter-container"]}>
      <div className={styles["filter-section"]}>
        <h4 className={styles["h4"]}> Categories</h4>
        <select
          className={styles["select"]}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          {uniqueCategories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["filter-section"]}>
        <h4 className={styles["h4"]}>Price Range</h4>
        <div className={styles["price-input"]}>
          <input
            type="number"
            className={styles["input"]}
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            min={0}
            max={priceRange[1]}
            key="minPrice"
          />
          <span>$</span>
          <span> - </span>
          <input
            className={styles["input"]}
            type="number"
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            min={priceRange[0]}
            max={1000}
            key="maxPrice"
          />
          <span>$</span>
          <button className={styles["button"]} onClick={handleFilterByPrice}>
            Apply
          </button>
        </div>
      </div>
      <div className={styles["filter-section"]}>
        <button className={styles["button"]} onClick={handleResetFilter}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
