import SearchBar from "../components/SearchBar/SearchBar";                                         

export default function Nav() {
  return (
    <div className={styles.nav}>
      <Link className={styles.link} to="/">
        <h1 className={styles.title}>ClotheStore</h1>
      </Link>

      <select>
        <option value="none">Categories</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
      </select>

      <select>
        <option value="none">Price</option>
        <option value="lower">Lower</option>
        <option value="higher">Higher</option>
      </select>

      <SearchBar/>
    </div>
  );
}
