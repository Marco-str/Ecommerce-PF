import style from "./Nav.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Nav = () => {
  return (
    <div className={style.mainContainer}>
      <Link className={style.link} to="/">
        <h1 className={style.title}>ClotheStore</h1>
      </Link>

      <Link to="/post">
        <button className={style.button}>Publicate</button>
      </Link>


      <Link className={style.link} to="/login">
        <h1 className={style.title}>Log in</h1>
      </Link>

      <Link className={style.link} to="/signup">
        <h1 className={style.title}>Sign up</h1>
      </Link>

      <SearchBar />
    </div>
  );
};

export default Nav;
