import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCategory, filterByPrice, resetFilters } from '../../redux/actions/actions';
import styles from './Filters.module.css';

const Filters = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    // Obtener las categorías únicas de los productos
    const categories = products.map(product => product.category);
    const uniqueCategories = Array.from(new Set(categories));
    setUniqueCategories(uniqueCategories);
  }, [products]);

  const handleResetFilter = () => {
    setSelectedCategory('');
    setPriceRange([0, 1000]);
    dispatch(resetFilters());
  };

  const handleCategoryChange = event => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    dispatch(filterByCategory(selectedCategory));
  };

  const handleMinPriceChange = event => {
    const minPrice = parseInt(event.target.value, 10);
    setPriceRange([minPrice, priceRange[1]]);
  };

  const handleMaxPriceChange = event => {
    const maxPrice = parseInt(event.target.value, 10);
    setPriceRange([priceRange[0], maxPrice]);
  };

  const handleFilterByPrice = () => {
    dispatch(filterByPrice(priceRange));
  };

  return (
    <div className={styles['filter-container']}>
      <h3>Filters</h3>
      <div className={styles['filter-section']}>
        <h4>Categories</h4>
        <select
          className="Categories"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          {uniqueCategories.map(category => (
            <option value={category} key={category}>
              {category.replace(/_/g, ' ').charAt(0).toUpperCase() + category.replace(/_/g, ' ').slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className={styles['filter-section']}>
        <h4>Price Range</h4>
        <div className={styles['price-input']}>
          <input
            type="number"
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            min={0}
            max={priceRange[1]}
            key="minPrice"
          />
          <span>$</span>
          <span> - </span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            min={priceRange[0]}
            max={1000}
            key="maxPrice"
          />
          <span>$</span>
          <button onClick={handleFilterByPrice}>Apply</button>
        </div>
      </div>
      <div className={styles['filter-section']}>
        <button
          className={styles['reset-button']}
          onClick={handleResetFilter}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;