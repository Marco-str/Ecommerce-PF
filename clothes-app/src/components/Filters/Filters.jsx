import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByPrice, filterByCategory, filterByColor, resetFilters } from '../../redux/actions/actions';
import styles from './Filters.module.css';

const Filters = () => {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const products = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [uniqueColors, setUniqueColors] = useState([]);

  useEffect(() => {
    // Obtener las categorías únicas de los productos
    const categories = products.map(product => product.category);
    const uniqueCategories = Array.from(new Set(categories));
    setUniqueCategories(uniqueCategories);

    // Obtener los colores únicos de los productos
    const colors = products.flatMap(product => product.color);
    const uniqueColors = Array.from(new Set(colors));
    setUniqueColors(uniqueColors);
  }, [products]);

  const handlePriceChange = event => {
    setPriceRange([0, parseInt(event.target.value)]);
  };

  const handleFilterByPrice = () => {
    dispatch(filterByPrice(priceRange));
  };

  const handleResetFilter = () => {
    setPriceRange([0, 1000]);
    setSelectedCategory('');
    setSelectedColor('');
    dispatch(resetFilters());
  };

  const handleCategoryChange = event => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    dispatch(filterByCategory(selectedCategory));
  };

  const handleColorChange = event => {
    const selectedColor = event.target.value;
    setSelectedColor(selectedColor);
    dispatch(filterByColor(selectedColor));
  };

  return (
    <div className={styles['filter-container']}>
      <h3>Filters</h3>
      <div className={styles['filter-section']}>
        <h4>Price Range</h4>
        <input
          type="range"
          value={priceRange[1]}
          onChange={handlePriceChange}
          min={0}
          max={1000}
        />
        <div>Min Price: ${priceRange[0]}</div>
        <div>Max Price: ${priceRange[1]}</div>
        <button className={styles['apply-button']} onClick={handleFilterByPrice}>
          Apply
        </button>
      </div>
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
        <h4>Color</h4>
        <select
          className="Color"
          value={selectedColor}
          onChange={handleColorChange}
        >
          <option value="">All</option>
          {uniqueColors.map(color => (
            <option value={color.ColorId} key={color.ColorId}>
              {color.ColorName}
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

export default Filters;