import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProductByName } from "../../redux/actions/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setName(e.target.value);
    dispatch(getAllProductByName(e.target.value));
  };

  return (
    <div className={styles.centralize}>
      <form>
        <div className={styles.inputBlock}>
          <input
            value={name}
            type="text"
            name="input-text"
            id="input-text"
            spellCheck="false"
            placeholder="SEARCH"
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}
