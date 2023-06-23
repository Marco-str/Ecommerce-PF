import React from "react";
import { Link } from "react-router-dom";
import styles from "./MercadoPagoAceptado.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function MercadoPagoAceptado() {

  return (
    <div className={styles.successPage}>
      <h2>Su pago fue aceptado </h2> 
      <AiOutlineCheckCircle className={styles.iconCheck} />
      <Link to="/home">
        <button className={styles.button}>
          <FaArrowLeft className={styles.icon}></FaArrowLeft> Return To Home
        </button>
      </Link>
    </div>
  );
}
