import React from "react";
import { Link } from "react-router-dom";
import styles from "./MercadoPagoAceptado.module.css";
import { FaArrowLeft } from "react-icons/fa";


export default function MercadoPagoAceptado() {
  return (
    <div>
      <h1>Su pago fue aceptado</h1>

      <Link to="/home">
        <button className={styles.button}>
          Return To Home<FaArrowLeft className={styles.icon}></FaArrowLeft>
        </button>
      </Link>
    </div>
  );
}
