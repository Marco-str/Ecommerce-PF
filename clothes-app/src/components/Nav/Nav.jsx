import SearchBar from "../components/SearchBar/SearchBar";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

export default function Nav() {
  return (
    <div className={styles.nav}>
      <Link className={styles.link} to="/">
        <h1 className={styles.title}>ClotheStore</h1>
      </Link>
      <Login />
      <SignUp />

      <SearchBar />
    </div>
  );
}
