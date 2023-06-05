import React from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from 'react-router-dom';

// import { searchRecipeById } from '../../redux/actions/index.js';
import { FaCartArrowDown, FaArrowLeft } from "react-icons/fa";

import styles from './detail.module.css';

export default function Detail() {
    // const dispatch = useDispatch();
    // const { detailId } = useParams();
    // const state = useSelector(state => state.recipeDetail);

    // useEffect(() => {
    //     dispatch(searchRecipeById(detailId));
    // }, [dispatch, detailId]);


    return (
        <div className={styles.mainContainer}>
        
        <div className={styles.productImg}>
          <h3>Nombre del producto</h3>
          <div className={styles.img}></div>
        </div>

        <div className={styles.details}>
          <div className={styles.buyNow}>
            <h3>BUY NOW</h3>
            <h3>$5000</h3>
          </div>
          <div className={styles.colorSize}>
            <div>
              <label htmlFor="color">
                Color:
              </label>
              <button className={styles.color} style={{backgroundColor: 'white'}}></button>
              <button className={styles.color} style={{backgroundColor: 'red'}}></button>
              <button className={styles.color} style={{backgroundColor: 'blue'}}></button>
            </div>
            <div>
              <label htmlFor="colors">Color: </label>
              <input type="color" name={styles.colors} id="" />
            </div>
            <div>
              <label htmlFor="color">
                Size:
              </label>
              <button className={styles.size}>S</button>
              <button className={styles.size}>M</button>
              <button className={styles.size}>L</button>
            </div>
          </div >
        <div className={styles.cart}>
            <button>Add to Cart <FaCartArrowDown className={styles.icon}></FaCartArrowDown></button>
            <button>Back <FaArrowLeft className={styles.icon}></FaArrowLeft></button>
        </div>
        </div >
      </div >
    );
}