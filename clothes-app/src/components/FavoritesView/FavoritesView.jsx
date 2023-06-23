import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../Card/Card";
import styles from "./favorite.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites, getFavorites } from "../../redux/actions/actions";
import Nav from "../Nav/Nav";
import { Paginado2 } from "../Paginado2/Paginado2";

const FavoritesView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const favorites = useSelector((state) => state.myFavorites);
  const [defaultFavorites, setDefaultFavorites] = useState(true);

  const [pagina, setPagina] = useState(1);
  const porPagina = 3;

  const maximo = Math.ceil(favorites.length / porPagina);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(`/whishListProduct/${id}`);
        dispatch(setFavorites(response.data.Clothes));
      } catch (error) {
        console.error("Error al obtener los productos favoritos", error);
      }
    };
    fetchFavoriteProducts();
  }, [dispatch, id]);

  useEffect(() => {
    if (defaultFavorites) {
      dispatch(getFavorites(id));
      setDefaultFavorites(false);
    }
  }, [dispatch, defaultFavorites, id]);

  console.log(favorites);

  return (
    <div className={styles.container_fav}>
      <Nav />
      <div className={styles.containerFAvsmai}>
        <h1 className={styles.title_fav}>Productos Favoritos</h1>
        {favorites?.length === 0 ? (
          <div className={styles.divContainerH1}>
            <h1 className={styles.h1Info}>
              No tienen ningun producto en favoritos
            </h1>
          </div>
        ) : (
          <div className={styles.containerCards}>
            {favorites
              .slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              )
              .map((favorite) => (
                <Card
                  className={styles.cssCard}
                  key={favorite.id}
                  id={favorite.id}
                  name={favorite.name}
                  image={favorite.image}
                  price={favorite.price}
                  idUserFav={id}
                />
              ))}
          </div>
        )}
      </div>

      {favorites?.length === 0 ? (
        <Link to="/home" className={styles.navlink}>
          <button className={styles.back_button}>Add a product</button>
        </Link>
      ) : (
        <Link to="/home" className={styles.navlink}>
          <button className={styles.back_button}>Back</button>
        </Link>
      )}

      {favorites?.length === 0 ? null : favorites?.length >= 4 ? (
        <Paginado2 pagina={pagina} setPagina={setPagina} maximo={maximo} />
      ) : null}
    </div>
  );
};

export default FavoritesView;
