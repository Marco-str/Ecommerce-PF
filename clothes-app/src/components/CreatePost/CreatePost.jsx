import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { validate } from "./validator.js";
import { createPost } from "../../redux/actions/actions";
import styles from "./CreatePost.module.css";


export default function CreatePost() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products); 
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState({
    name: "",
    color: "",
    price: "",
    image: "",
    category: [],
    description: ""
  }); //objeto igual a input
  const [input, setInput] = useState({
    name: "",
    color: "",
    price: "",
    image: "",
    category: [],
    description: ""
  });


  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (types.length > 2) {
      return alert("Choose only two types");
    }
    // if (!error && types.length) {
    //  alert('errorrr')
    // }
    if (!types.length) {
      alert("Select a Category");
    } else {
      
      dispatch(createPost(input));

      setInput({
        name: "",
        color: "",
        price: "",
        image: "",
        category: [],
        description: ""
      });

      setCategories([]);
      e.target.reset();
//if
      alert("Prod created!");
    }
  };

  const handleCategoriesChange = (e) => {
    if (e.target.checked) {
      setCategories([...categories, e.target.value]);
      setInput({ ...input, category: [...category, e.target.value] });
    }

    
  };

  return (
    <div className={styles.body}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.nav}>
          <h1>Publicate</h1>
          <button className={styles.button}>Create</button>
          <Link to="/">
            <button className={styles.button}>Back</button>
          </Link>
        </div>

        <div className={styles.statsAndTypes}>
          <div className={styles.stats}>
            <h3>Stats</h3>

            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  type="text"
                  name="name"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.name}
                  onChange={handleInputChange}
                />

                {error.name && <p>{error.name}</p>}

                <span className={styles.placeholder}>Name</span>
              </div>
            </div>


            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  type="text"
                  name="color"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.attack}
                  onChange={handleInputChange}
                />
                <span className={styles.placeholder}>Attack</span>
              </div>
            </div>

            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  type="number"
                  name="price"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.defense}
                  onChange={handleInputChange}
                />
                <span className={styles.placeholder}>Defense</span>
              </div>
            </div>

            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  type="number"
                  name="image"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.speed}
                  onChange={handleInputChange}
                />
                <span className={styles.placeholder}>Speed</span>
              </div>
            </div>


            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  type="text"
                  name="image"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.image}
                  onChange={handleInputChange}
                />
                {error.image && <p>{error.image}</p>}
                <span className={styles.placeholder}>Image Link: </span>
              </div>
            </div>
          </div>

          <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  type="text"
                  name="description"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.weight}
                  onChange={handleInputChange}
                />
                <span className={styles.placeholder}>Weight</span>
              </div>
            </div>

          <div className={styles.types}>
            <h3>Categories</h3>
            <div className={styles.typesOrder}>
              {typesData.map((e) => (
                <div className={styles.container}>
                  <ul className={styles.ksCboxtags}>
                    <li>
                      <input
                        onChange={handleCategoriesChange}
                        type="checkbox"
                        id={`checkbox${e.id}`}
                        value={e.name}
                      />
                      <label for={`checkbox${e.id}`}>{e.name}</label>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
