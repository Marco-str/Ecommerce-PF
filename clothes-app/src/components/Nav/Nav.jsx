import style from "./Nav.module.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className={style.mainContainer}>
      <Link className={style.link} to="/">
        Example
      </Link>
      <Link className={style.link} to="/home">
        Example
      </Link>
      <Link className={style.link} to="/create">
        Example
      </Link>
    </div>
  );
};

export default Nav;
