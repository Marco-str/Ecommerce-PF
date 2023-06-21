import React from "react";
import { Link } from "react-router-dom";
import styles from "./MercadoPagoAceptado.module.css";
import { FaArrowLeft } from "react-icons/fa";


export default function MercadoPagoRechazado() {
  return (
    <div>
      <h1>Su pago fue rechazado</h1>

      <Link to="/carrito">
        <button className={styles.button}>
          Return To Cart <FaArrowLeft className={styles.icon}></FaArrowLeft>
        </button>
      </Link>
    </div>
  );
}
