import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { validate } from "./validator.js";
import { createPost, getAllProducts } from "../../redux/actions/actions";
import styles from "./CreatePost.module.css";



export default function CreatePost() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  // Obtenemos todas las categorías únicas de los productos
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  );
  // eslint-disable-next-line
  const [categories, setCategories] = useState(uniqueCategories);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [error, setError] = useState({
    name: "",
    color: "",
    price: "",
    image: "",
    category: [],
    description: "",
  });

  const [input, setInput] = useState({
    name: "",
    color: "",
    price: "",
    image: "",
    category: [],
    description: "",
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

    if (input.category.length > 2) {
      return alert("Choose only two types");
    }

    if (input.category.length === 0) {
      return alert("Select a Category");
    }

    dispatch(createPost(input));

    setInput({
      name: "",
      color: "",
      price: "",
      image: "",
      category: [],
      description: "",
    });

    setError({
      name: "",
      color: "",
      price: "",
      image: "",
      category: [],
      description: "",
    });

    e.target.reset();

    alert("Post created!");
  };

  const handleCategoriesChange = (e) => {
    const selectedCategories = [...input.category];

    if (e.target.checked) {
      if (!selectedCategories.includes(e.target.value)) {
        selectedCategories.push(e.target.value);
      }
    } else {
      const index = selectedCategories.indexOf(e.target.value);
      if (index > -1) {
        selectedCategories.splice(index, 1);
      }
    }

    setInput({ ...input, category: selectedCategories });
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
            <h3>Characteristics</h3>

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
                <span className={styles.placeholder}>Color</span>
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
                <span className={styles.placeholder}>Price</span>
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
                <span className={styles.placeholder}>Description</span>
              </div>
            </div>
            
          </div>
          
          
          <div className={styles.types}>
            <h3>Categories</h3>
            <div className={styles.typesOrder}>
              {uniqueCategories.map((e) => (
                <div className={styles.container}>
                  <ul className={styles.ksCboxtags}>
                    <li>
                      <input
                        onChange={handleCategoriesChange}
                        type="checkbox"
                        id={`checkbox${e}`}
                        value={e}
                      />
                      <label htmlFor={`checkbox${e}`}>{e}</label>
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




///////

// const createPost = async (req, res) => {
//   try {
//     const {   name, color, price, image, category, description } = req.body;
//     const findClothe = await Clothes.findOne({
//       where: { name: name.toLowerCase() },//ver esto de lowerCase
//     });//Solo se fija si existe entre los creados
//     if (findPokemon) {
//       res.status(400).send("User already exists");
//     } else {
//       let newPokemon = await Pokemon.create({
//         name: name.toLowerCase(),
//         image: image,
//         hp: hp,
//         attack: attack,
//         defense: defense,
//         speed: speed,
//         height: height,
//         weight: weight,
//       });
//       let pokemonType = await Type.findAll({
//         where: {
//           name: types,
//         },
//       });
//       await newPokemon.addTypes(pokemonType);
//       res.status(200).send("Pokemon Created")
//     }
//   } catch (error) {
//     console.log(error)}};