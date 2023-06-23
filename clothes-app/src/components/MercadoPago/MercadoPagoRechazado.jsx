import React from "react";
import { Link } from "react-router-dom";
import styles from "./MercadoPagoRechazado.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { VscError } from "react-icons/vsc";


export default function MercadoPagoRechazado() {
  return (
    <div className={styles.refusedPage}>
      <h2 className={styles.refusedTitle}>Lo sentimos su pago fue rechazado </h2>
      <VscError className={styles.iconError}/>
      <Link to="/carrito">
        <button className={styles.button}>
          Return To Cart <FaArrowLeft className={styles.icon}></FaArrowLeft>
        </button>
      </Link>
    </div>
  );
}
