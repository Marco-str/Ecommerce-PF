import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCategory, resetFilters } from '../../redux/actions/actions';
import styles from './Filters.module.css';

const Filters = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    // Obtener las categorías únicas de los productos
    const categories = products.map(product => product.category);
    const uniqueCategories = Array.from(new Set(categories));
    setUniqueCategories(uniqueCategories);
  }, [products]);

  const handleResetFilter = () => {
    setSelectedCategory('');
    dispatch(resetFilters());
  };

  const handleCategoryChange = event => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    dispatch(filterByCategory(selectedCategory));
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
              {category}
            </option>
          ))}
        </select>
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

export default Filters;;

