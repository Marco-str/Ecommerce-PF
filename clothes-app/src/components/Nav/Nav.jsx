import style from "./Nav.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Nav = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.divs1}>
        <Link className={style.link} to="/">
          Home
        </Link>
      </div>
      <div className={style.divs2}>
        {" "}
        <Link to="/post">
          <button className={style.button}>Publicate</button>
        </Link>
      </div>
      <div className={style.divs3}>
        <SearchBar />
      </div>
    </div>
  );
};

export default Nav;
