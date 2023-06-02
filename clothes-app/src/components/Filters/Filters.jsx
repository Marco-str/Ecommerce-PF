import React, { useState } from 'react';
import { MenuItem, Select, Slider, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { filterByGender, filterByPrice } from '../../redux/actions/actions';
import style from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    dispatch(filterByGender(event.target.value));
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleFilterByPrice = () => {
    dispatch(filterByPrice(priceRange));
  };

  const handleResetFilter = () => {
    setGender('all');
    setPriceRange([0, 1000]);
    // Dispatch an action to reset the filters in your reducer
  };

  return (
    <div className={style.container}>
      <h3>Filter</h3>
      <div className={style.filterSection}>
        <h4>Gender</h4>
        <Select value={gender} onChange={handleGenderChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="men">Men</MenuItem>
          <MenuItem value="women">Women</MenuItem>
          <MenuItem value="kids">Kids</MenuItem>
        </Select>
      </div>
      <div className={style.filterSection}>
        <h4>Price Range</h4>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
        <Button variant="contained" onClick={handleFilterByPrice}>
          Apply
        </Button>
      </div>
      <div className={style.filterSection}>
        <Button variant="contained" color="secondary" onClick={handleResetFilter}>
          Reset Filter
        </Button>
      </div>
    </div>
  );
};

export default Filter;