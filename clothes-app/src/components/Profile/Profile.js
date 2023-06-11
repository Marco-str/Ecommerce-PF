import React from "react";
import { useSelector } from "react-redux";
import styles from "./Profile.module.css";

const Profile = () => {
  const user = useSelector((state) => state.user);

  // Verifica si el usuario está autenticado
  if (!user) {
    // Redirige al usuario a la página de inicio de sesión u otra página apropiada
    // ...
    return null;
  }

  // Autocompleta los datos del perfil con los datos del usuario
  const { name, email, password, phone, address, purchaseHistory } = user;

  return (
    <div>
      <h2 className={styles.title}>Profile</h2>
      <p className={styles.info}>Name: {name}</p>
      <p className={styles.info}>Email: {email}</p>
      <p className={styles.info}>Password: {password}</p>
      <p className={styles.info}>Phone: {phone}</p>

      <h3 className={styles.subtitle}>Address</h3>
      <p className={styles.address}>{address}</p>

      <h3 className={styles.subtitle}>Purchase History</h3>
      <ul className={styles.purchaseList}>
        {purchaseHistory && purchaseHistory.map((purchase) => (
          <li key={purchase.id}>
            <p className={styles.purchaseInfo}>Product: {purchase.product}</p>
            <p className={styles.purchaseInfo}>Price: {purchase.price}</p>
            <p className={styles.purchaseInfo}>Date: {purchase.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;