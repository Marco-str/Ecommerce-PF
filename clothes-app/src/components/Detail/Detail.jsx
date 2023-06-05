import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getDetail } from "../../redux/actions/actions.js";
import { FaCartArrowDown, FaArrowLeft } from "react-icons/fa";

import styles from "./detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state.productDetail);


  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productImg}>
        <h3>{state?.name}</h3>
        <div className={styles.img}>
          <img
            src={state?.image}
            alt={state?.name}
            className={styles.imgProducto}
          />
        </div>
        <div className={styles.buyNow}>
          <h3>BUY NOW</h3>
          <h3>${state?.price}</h3>
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <select type="select" name="color">
            <option>None</option>
            {state?.color &&
              state.color.map((e) => (
                <option
                  className={styles.color}
                  name={e.ColorName}
                  key={e.ColorName}
                >
                  {e.ColorName}
                </option>
              ))}
          </select>
          <div>
            <label htmlFor="color">Size:</label>
            <button className={styles.size}>S</button>
            <button className={styles.size}>M</button>
            <button className={styles.size}>L</button>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div>
          <div dangerouslySetInnerHTML={{ __html: state?.description }}></div>
          {/* <button className={styles.color} style={{backgroundColor: 'SANDSHELL'}}></button>
              <button className={styles.color} style={{backgroundColor: 'red'}}></button>
              <button className={styles.color} style={{backgroundColor: 'blue'}}></button> */}
        </div>
        <div className={styles.cart}>
          <button onClick={() => alert("En producción")}>
            Add to Cart{" "}
            <FaCartArrowDown className={styles.icon}></FaCartArrowDown>
          </button>
          <NavLink to="/">
            <button className={styles.bttnBack}>
              Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
