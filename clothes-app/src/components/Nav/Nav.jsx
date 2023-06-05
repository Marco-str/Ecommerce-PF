import style from "./Nav.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar"

const Nav = () => {
  return (
    <div className={style.mainContainer}>
      <Link className={style.link} to="/">
        Example
      </Link>
      
     
      <Link to='/post'><button className={style.button}>Publicate</button></Link>
      <SearchBar/>
    </div>
  );
};

export default Nav;
