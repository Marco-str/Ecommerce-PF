import SearchBar from "../components/SearchBar/SearchBar";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Filters from '../Filters/Filters';
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className={styles.nav}>
      <Link className={styles.link} to="/">
        <h1 className={styles.title}>ClotheStore</h1>
      </Link>

      <Filters/>
      <SearchBar />

      <Link className={styles.link} to='/login'>
        <h1 className={styles.title}>Log in</h1>
      </Link>
      
      <Link className={styles.link} to='/signup'>
        <h1 className={styles.title}>Sign Up</h1>
      </Link>

     

      
    </div>
  );
}
