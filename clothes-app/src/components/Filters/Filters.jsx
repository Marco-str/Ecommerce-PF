import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByPrice, filterByCategory } from '../../redux/actions/actions';
import styles from './Filters.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const products = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handlePriceChange = event => {
    setPriceRange([0, event.target.value]);
  };

  const handleFilterByPrice = () => {
    dispatch(filterByPrice(priceRange));
  };

  const handleResetFilter = () => {
    setPriceRange([0, 1000]);
    // Dispatch an action to reset the filters in your reducer
  };

  const handleCategoryChange = event => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    dispatch(filterByCategory(selectedCategory));
  };

  return (
    <div className={styles['filter-container']}>
      <h3>Filter</h3>
      <div className={styles['filter-section']}>
        <h4>Price Range</h4>
        <input
          type="range"
          value={priceRange[1]}
          onChange={handlePriceChange}
          min={0}
          max={1000}
        />
        <button onClick={handleFilterByPrice}>Apply</button>
      </div>
      <div className={styles['filter-section']}>
        <button
          className={styles['reset-button']}
          onClick={handleResetFilter}
        >
          Reset Filter
        </button>
      </div>
      <div className={styles['filter-section']}>
        <h4>Categories</h4>
        <select
          className="Categories"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">--Select--</option>
          {products.map(product => (
            <option value={product.category} key={product.category}>
              {product.category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;