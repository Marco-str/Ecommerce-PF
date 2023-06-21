import React, { useState } from "react";
//import {  useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./ListUser.module.css";
import axios from "axios";

const ListUser = () => {
  const { id } = useParams();
  const [userOrders, setUserOrders] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`orders/${id}`);
      setUserOrders([...response.data]);
    } catch (error) {
      alert(error);
    }
  };

  const truncatedText =
    userOrders.length > 0 ? userOrders[0].date.slice(0, 10) : "";

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.subContainer}>
        <form action="" onSubmit={submitHandler} className={styles.formulario}>
          <h1>Your Histrial of Purchases</h1>

          <button type="submit" className={styles.bottonAsk}>
            <p className={styles.text}>Ask Data</p>
            <svg
            className={styles.svgSearch}
              width="30px"
              height="30px"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0355 14.0355L20 20M15.5 10.5C15.5 13.2614 13.2614 15.5 10.5 15.5C7.73858 15.5 5.5 13.2614 5.5 10.5C5.5 7.73858 7.73858 5.5 10.5 5.5C13.2614 5.5 15.5 7.73858 15.5 10.5Z"
                stroke="#121923"
                stroke-width="1.2"
              />
            </svg>
          </button>
        </form>
        <div className={styles.div_containers}>
          <h1>Orders</h1>
          <div className={styles.each_liElement}>
            <ul className={styles.ul_elements}>
              {userOrders.map((order, index) => (
                <li key={index} className={styles.li_elements}>
                  <div className={styles.containerInfo}>
                    <p className={styles.info}>Order ID: {order.id} </p>
                    <div className={styles.containerSvg}>
                      <svg
                        className={styles.svg21}
                        width="30px"
                        height="30px"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 14.5C7 15 5.5 16 5.5 19.5H19.5C19.5 16 18.3416 15.1708 17 14.5C16 14 14 14 14 12.5C14 11 15 10.25 15 8.25C15 6.25 14 5.25 12.5 5.25C11 5.25 10 6.25 10 8.25C10 10.25 11 11 11 12.5C11 14 9 14 8 14.5Z"
                          stroke="#121923"
                          stroke-width="1.2"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className={styles.containerInfo}>
                    <p className={styles.info}>Order Date: {truncatedText}</p>
                    <div className={styles.containerSvg}>
                      <svg
                        className={styles.svg21}
                        width="30px"
                        height="30px"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.5 10.5V19.5H20.5V10.5M4.5 10.5V5.5H20.5V10.5M4.5 10.5H12.5H20.5M20.5 13.5H16.5M16.5 13.5H12.5M16.5 13.5V10.5M16.5 13.5V16.5M12.5 13.5H8.5M12.5 13.5V16.5M12.5 13.5V10.5M8.5 13.5H4.5M8.5 13.5V10.5M8.5 13.5V16.5M20.5 16.5H16.5M16.5 16.5H12.5M16.5 16.5V19.5M12.5 16.5H8.5M12.5 16.5V19.5M8.5 16.5H4.5M8.5 16.5V19.5M17.5 8V3M7.5 8V3"
                          stroke="#121923"
                          stroke-width="1.2"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className={styles.containerInfo}>
                    <p className={styles.info}>Status : {order.status}</p>
                  </div>
                  <div className={styles.containerInfo}>
                    <p className={styles.info}>
                      Total purchase: ${order.total}
                    </p>
                  </div>
                  <div className={styles.containerInfo}>
                    <p className={styles.info}>
                      Payment Method: {order.paymentMetod}
                    </p>
                    <div className={styles.containerSvg}>
                      <svg
                        className={styles.svg21}
                        width="30px"
                        height="30px"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.5 10.5H20.5M4.5 9.5H20.5M4.5 11.5H20.5M7 15.5H14M5.5 18.5H19.5C20.0523 18.5 20.5 18.0523 20.5 17.5V7.5C20.5 6.94772 20.0523 6.5 19.5 6.5H5.5C4.94772 6.5 4.5 6.94772 4.5 7.5V17.5C4.5 18.0523 4.94772 18.5 5.5 18.5Z"
                          stroke="#121923"
                          stroke-width="1.2"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3>Clothes: </h3>
                  <ul className={styles.ul}>
                    {order.products.map((product, index) => (
                      <li key={index} className={styles.li_elements_inside}>
                        <p>Product :</p>
                        <h3>{product.title}</h3>
                        <p>Product Price: {product.unit_price}💲 </p>
                        <p>Product Quantity: {product.quantity}</p>
                        <p>Product Currency: {product.currency_id}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <Link to="/profile">
            <button className={styles.button}>
              Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListUser;
