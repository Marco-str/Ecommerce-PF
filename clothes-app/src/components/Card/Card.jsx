import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ name, image }) => {
  // Desestructurar la prop 'name' de las props
  return (
    <div className={style.mainContainer}>
      <p>{name}</p>
      <img className={style.card} src={image} alt="" />
      {<Link>Learn more</Link>}
    </div>
  );
};
//marco puto
export default Card;
