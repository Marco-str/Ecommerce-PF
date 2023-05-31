
import styles from "./SearchBar.module.css";

export default function SearchBar() {
   

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
