import React from 'react';
import styles from "./MercadoPagoPendiente.module.css";
import { MdOutlinePending } from 'react-icons/md'

export default function MercadoPagoPendiente() {
  return (
    <div className={styles.pendingPage}>
        <h2 className={styles.refusedTitle} >Su pago esta en estado pendiente</h2>
        <MdOutlinePending className={styles.iconPending} />
    </div>
  )
}



