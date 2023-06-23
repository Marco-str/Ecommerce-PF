import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCart, updatedCart } from "../../../redux/actions/actions.js";

import styles from "../carrito.module.css";

export default function CartProduct({ product, stock }) {
  const dispatch = useDispatch();
  const [valueInp, setValueInp] = useState(parseInt(product.quantity));
  const [isMaxStock, setIsMaxStock] = useState(valueInp >= stock);
  const cart = JSON.parse(localStorage.getItem("carritoLS"));

  const handleDelete = () => {
    let deleteCartArray = cart.filter((e) => e.id !== product.id);
    dispatch(deleteCart(deleteCartArray));
  };

  function modificarObjetoPorId(arreglo, id, nuevosDatos) {
    const indice = arreglo.findIndex((objeto) => objeto.id === id);
    if (indice !== -1) arreglo[indice] = { ...arreglo[indice], ...nuevosDatos };
  }

  const handleAddition = () => {
    if (valueInp < stock) {
      const newValue = valueInp + 1;
      setValueInp(newValue);
      setIsMaxStock(newValue >= stock);
      modificarObjetoPorId(cart, product.id, {
        ...product,
        quantity: newValue,
      });
      dispatch(updatedCart(cart));
    }
  };

  const handleSubtraction = () => {
    if (valueInp > 1) {
      const newValue = valueInp - 1;
      setValueInp(newValue);
      setIsMaxStock(newValue >= stock);
      modificarObjetoPorId(cart, product.id, {
        ...product,
        quantity: newValue,
      });
      dispatch(updatedCart(cart));
    }
  };

  return (
    <div className={styles.crtPrdct}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.imgCarrito}
      />
      <div>
        <p className={styles.h2_name}>{product.name}</p>
      </div>
      <div>
        <p className={styles.h2_name}> ${product.price}</p>
      </div>
      <div className={styles.containerTrash}>
        <button
          className={styles.trash}
          onClick={handleDelete}
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 6.5H20M10 6.5V4.5C10 3.94772 10.4477 3.5 11 3.5H14C14.5523 3.5 15 3.94772 15 4.5V6.5M12.5 9V17M15.5 9L15 17M9.5 9L10 17M18.5 6.5L17.571 18.5767C17.5309 19.0977 17.0965 19.5 16.574 19.5H8.42603C7.90349 19.5 7.46905 19.0977 7.42898 18.5767L6.5 6.5H18.5Z"
              stroke="#121923"
              strokeWidth="1.2"
            />
          </svg>
        </button>

        <div className={styles.cantidadProducto}>
          <button onClick={handleSubtraction} className={styles.bttnAdd}>
            <svg
            className={styles.svgAddorLess}
              width="30px"
              height="30px"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 12.5H20" stroke="#121923" strokeWidth="1.2" />
            </svg>
          </button>

          {/* <input className={styles.productAmout} type="text" value={valueInp} readOnly /> */}
          <span className={styles.productAmount}>
            <span className={styles.productAmountValue}>{valueInp}</span>
          </span>

          <button
            onClick={handleAddition}
            className={styles.bttnAdd}
            disabled={isMaxStock}
          >
            <svg
            className={styles.svgAddorLess}
              width="30px"
              height="30px"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 5V20M5 12.5H20"
                stroke="#121923"
                strokeWidth="1.2"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
