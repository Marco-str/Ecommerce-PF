import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../../redux/action/index";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
 

  const hanldeInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      // verifica si el valor del campo de entrada no está vacío
      console.log(name);
      dispatch(getNamePokemon(name));
      setName(""); // limpia el valor del campo de entrada después de enviar la acción
    } else {
      alert("Enter a valid name");
    }
  };

  return (
    <div className={styles.centralize}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={styles.inputBlock}>
          <input
          value={name}
            type="text"
            name="input-text"
            id="input-text"
            spellCheck="false"
            onChange={(e) => {
              hanldeInputChange(e);
            }}
          />
          <span className={styles.placeholder}>Search</span>
        </div>
      </form>
    </div>
  );
}
