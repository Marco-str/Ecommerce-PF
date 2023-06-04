import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByPrice, filterByCategory } from '../../redux/actions/actions';
import styles from './Filters.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const products = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    const categories = Array.from(new Set(products.map(product => product.category)));
    setUniqueCategories(categories);
  }, [products]);

  const handlePriceChange = event => {
    const maxPrice = Number(event.target.value);
    setPriceRange([0, maxPrice]);
  };

  const handleApplyFilter = () => {
    dispatch(filterByPrice(priceRange));
    dispatch(filterByCategory(selectedCategory));
  };

  const handleResetFilter = () => {
    setPriceRange([0, 1000]);
    setSelectedCategory('');
    window.location.reload(); // Restablecer la página
  };

  const handleCategoryChange = event => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
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
        <div className={styles['price-range-text']}>
          <p>{`$0 - $${priceRange[1]}`}</p>
        </div>
      </div>
      <div className={styles['filter-section']}>
        <h4>Categories</h4>
        <select
          className="Categories"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">--Select--</option>
          {uniqueCategories.map(category => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className={styles['filter-section']}>
        <button onClick={handleApplyFilter}>Apply</button>
        <button
          className={styles['reset-button']}
          onClick={handleResetFilter}
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;