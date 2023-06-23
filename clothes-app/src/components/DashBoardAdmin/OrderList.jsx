import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUserAll,
  getUserById,
  getOrderById,
  getAllOrders,
  getAllProducts,
} from "../../redux/actions/actions.js";
import styles from "./OrderList.module.css";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const OrderList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => state.orders);

  const [selectedUserId, setSelectedUserId] = useState("");
  const [userOrders, setUserOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    dispatch(getUserAll());
    dispatch(getAllOrders());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(getUserById(selectedUserId));
      dispatch(getOrderById(selectedUserId));
    } else {
      setUserOrders([]);
      setFilteredOrders(orders);
    }
  }, [dispatch, orders, selectedUserId]);

  /******************************************************************* */

  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
  };
  /******************************************************************* */

  const handleFilterByDate = () => {
    setIsAscending((prevState) => !prevState);

    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (isAscending) {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
    setFilteredOrders(sortedOrders);
  };
  /************************************** *********************************************** */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`orders/${selectedUserId}`);
      console.log(response);
      setUserOrders([...response.data]);
    } catch (error) {
      alert(error);
    }
  };

  const truncatedText =
  filteredOrders.length > 0 ? filteredOrders[0].date.slice(0, 10) : "";

  /*******************  ******************************************************************* */
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.body_container}>
          <h1 className={styles.title_h1}>Order List</h1>
          {/* /***************************************************************************** * */}
          <form onSubmit={handleSubmit}>
            <select
              name="userId"
              className={styles.selected}
              value={selectedUserId}
              onChange={handleUserChange}
            >
              <option value="" disabled>
                SELECT USER
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
              <option value="">ALL orders</option>
            </select>
            <button type="submit" className={styles.butto_ask}>
              View All Orders
            </button>
          </form>
          {/* /***************************************************************************** * */}
          {!selectedUserId ? (
            <div className={styles.div_container}>
              <h3>All Orders</h3>
              <button onClick={handleFilterByDate}>Filter by Date</button>
              

              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div key={order.id} className={styles.li_elements}>
                    <h1>{order.status}</h1>
                    <h3>{order.paymentMethod}</h3>
                    <h3>{order.total}</h3>
                    <h3>{truncatedText}</h3>
                    <ul className={styles.ul_elements}>
                      {order.products.map((product) => {
                        return (
                          <li
                            key={product.id}
                            className={styles.li_elements_inside}
                          >
                            <h4>{product.title}</h4>
                            <p>Quantity: {product.quantity}</p>
                            <p>Price: {product.price}💲</p>
                            <p>Currency ID: {product.currencyId}</p>
                          </li>
                        );
                      })}
                    </ul>
                    <p>User ID: {order.userId}</p>
                  </div>
                ))
              ) : (
                <h1 className={styles.no_orders}>
                  ⚠️ You haven´t Purchases yet ⚠️
                </h1>
              )}
            </div>
          ) : userOrders.length === 0 ? (
            <h1 className={styles.no_orders}>
              ⚠️There are no orders for this user⚠️
            </h1>
          ) : (
            <div className={styles.div_container}>
              <h3>Orders of {selectedUserId.name} </h3>

              <ul className={styles.ul_elements}>
                {userOrders.map((order, index) => (
                  <li key={index} className={styles.li_elements}>
                    <p>Order ID: {order.id} 📍</p>
                    <p>Order Date: {truncatedText}</p>
                    <p>Status : {order.status}</p>
                    <p>Total de la compra: 💲{order.total}</p>
                    <p>Payment Method: {order.paymentMetod} </p>
                    <h3>Clothes: </h3>
                    <ul c>
                      {order.products.map((product, index) => (
                        <li key={index} className={styles.li_elements_inside}>
                          <p>
                            Product : <h3>{product.title}</h3>
                          </p>
                          <p>Product Price: {product.unit_price} </p>
                          <p>Product Quantity: {product.quantity}</p>
                          <p>Product Currency: {product.currency_id}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* /* ***************************************************************************** */}
      </div>
      <Link to="/DashBoardAdmin">
        <button className={styles.button_back}>
          Back <FaArrowLeft className={styles.icon_back}></FaArrowLeft>
        </button>
      </Link>
    </div>
  );
};

export default OrderList;
