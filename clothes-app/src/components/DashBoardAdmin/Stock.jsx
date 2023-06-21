import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Stock.module.css";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { getAllProducts } from "../../redux/actions/actions";
import Swal from "sweetalert2";

export default function Stock() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [updatedProducts, setUpdatedProducts] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handlerButtonMore = (event) => {
    const productId = event.target.value;
    const updatedProduct = products.find((p) => p.id === productId);

    if (updatedProduct) {
      updatedProduct.stock += 1;
      setUpdatedProducts((prevProducts) => [...prevProducts, updatedProduct]);
    }
  };

  const handlerButtonLess = (event) => {
    const productId = event.target.value;
    const updatedProduct = products.find((p) => p.id === productId);

    if (updatedProduct && updatedProduct.stock > 0) {
      updatedProduct.stock -= 1;
      setUpdatedProducts((prevProducts) => [...prevProducts, updatedProduct]);
    }
  };

  const handleSaveStock = async () => {
    Swal.fire({
      icon: "question",
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Promise.all(
            updatedProducts.map(async (product) => {
              await axios.put(`/products/${product.id}`, product);
            })
          );

          dispatch({ type: "UPDATE_PRODUCTS", payload: updatedProducts });
          setUpdatedProducts([]);
          Swal.fire("Saved!", "", "success");
        } catch (error) {
          console.error(error);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
    <div className={styles.all_container}>

    <div className={styles.main_container}>

      <h1>STOCK CONTROLLER</h1>

      {updatedProducts.length > 0 && (
        <button onClick={handleSaveStock} className={styles.button_save}>Save Stock</button>
        )}

      {products.map((product) => (
        <div className={styles.container} key={product.id}>
    

          <ul className={styles.ul}>  
            <span className={styles.span}>{product.name}</span>
          </ul>
            <img className={styles.img} src={product.image} alt={product.name} /> 
            <span className={styles.span}>  ${product.price}</span>
            <span>Stock disponible</span>
            <span className={styles.span}>  {product.stock}</span>
          
          
          <div className={styles.buttonContainer}>
            <button
              value={product.id}
              onClick={handlerButtonMore}
              className={styles.button}
            >
              +
            </button>
            <button
              value={product.id}
              onClick={handlerButtonLess}
              className={styles.button}
              >
              -
            </button>
          </div>
        </div>
      ))}

      {updatedProducts.length > 0 && (
        <button onClick={handleSaveStock} className={styles.button_save}>Save Stock</button>
        )}
<div>
      <Link to="/DashBoardAdmin">
        <button className={styles.button_back}>
          Back <FaArrowLeft className={styles.icon_back}></FaArrowLeft>
        </button>
      </Link>
</div>

    </div>

        </div>
    </>
  );
}
