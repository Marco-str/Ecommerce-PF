import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ name, image, id, price }) => {
  // Desestructurar la prop 'name' de las props
  return (
    <div className={style.mainContainer}>
      {
        <Link className={style.link} to={`/detail/${id}`}>
          <h2 className={style.title}>{name}</h2>
          <img className={style.card} src={image} alt="" />
          <p className={style.price}>${price}</p>
        </Link>
      }
    </div>
  );
};

export default Card;
