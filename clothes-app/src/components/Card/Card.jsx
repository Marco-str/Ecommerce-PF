import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, deleteFavorite } from "../../redux/actions/actions";
import { useState, useEffect } from "react";
import axios from "axios";

const Card = ({
  name,
  image,
  id,
  price,
  onUpdateFavorites,
  stock,
  idUserFav,
}) => {
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const { iniciado, userId, favorites } = useSelector((state) => ({
    iniciado: state.iniciado,
    userId: state.userId,
    favorites: state.favorites,
  }));
  useEffect(() => {
    const isFavorite = favorites.some((fav) => fav.id === id);
    setIsFav(isFavorite);
  }, [favorites, id]);

  if (iniciado?.length !== 0) localStorage.setItem("sesions", iniciado);
  const sesions = localStorage.getItem("sesions");

  const idForm = userId.id ? userId.id : idUserFav;
  const form = {
    id: id,
    UserId: idForm,
  };

  const handleAddFavorite = async () => {
    dispatch(addFavorite({ id, name, image, price }));
    try {
      await axios.post("/whishListProduct", form);
      setIsFav(!isFav);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFavorite = async () => {
    dispatch(deleteFavorite(id));
    try {
      await axios.delete(`/whishListProduct/`, {
        data: form,
      });
      setIsFav(!isFav);
      onUpdateFavorites(id); // Llama a la función de actualización para eliminar la carta de la lista de favoritos en FavoritesView
    } catch (error) {}
  };
  return (
    <div className={style.mainContainer}>
      {stock === 0 && <p className={style.price2}>Sin stock</p>}

      {userId.admin && sesions === "si" ? (
        <Link to={`/edit/${id}`}>
          <svg
            className={style.svg}
            width="50px"
            height="50px"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 7L18 10M6 19L7 15L17 5L20 8L10 18L6 19Z"
              stroke="#121923"
              strokeWidth="1.2"
            />
          </svg>
        </Link>
      ) : null}
      <div className={style.link}>
        <h2 className={style.title}>{name}</h2>
        {stock === 0 ? (
          <div>
            <Link to={`/detail/${id}`}>
              <img className={style.card2} src={image} alt="" />
            </Link>
          </div>
        ) : (
          <Link to={`/detail/${id}`}>
            <img className={style.card} src={image} alt="" />
          </Link>
        )}

        {stock === 0 ? null : <p className={style.price}>${price}</p>}

        {isFav ? (
          <button
            className={style.buttonFav}
            value={id}
            onClick={handleDeleteFavorite}
          >
            
            <svg
              className={style.svg2}
              width="47px"
              height="47px"
              viewBox="0 0 25.00 25.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ff0000"
              transform="matrix(1, 0, 0, 1, 0, 0)"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z"
                  fill="#e20808"
                  stroke="#e20808"
                  stroke-width="1.2"
                />
              </g>
            </svg>
          </button>
        ) : (
          <button
            className={style.buttonFav}
            onClick={handleAddFavorite}
          ><svg
              className={style.svg3}
              width="47px"
              height="47px"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z"
                stroke="#121923"
                stroke-width="1.2"
              />
            </svg></button>
        )}
      </div>
    </div>
  );
};

export default Card;
