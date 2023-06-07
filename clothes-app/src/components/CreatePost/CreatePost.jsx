import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { validate } from "./validator.js";
import { createPost, getAllProducts } from "../../redux/actions/actions";
import styles from "./CreatePost.module.css";
export default function CreatePost() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  );
  const [categories, setCategories] = useState(uniqueCategories);
  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  const stock = sizes.map((el) => `stock ${el}:`);
  const [error, setError] = useState({
    name: "",
    color: [], // colors: [{ColorName: "", Sizes :[{ SizeName:''}]}],
    price: "",
    image: "",
    category: "",
    description: "",
    stock: [
      {
        ColorName: "",
        Sizes: {
          stockXXS: "",
          stockXS: "",
          stockS: "",
          stockM: "",
          stockL: "",
          stockXL: "",
          stockXXL: "",
        },
      },
      {
        ColorName: "",
        Sizes: {
          stockXXS: "",
          stockXS: "",
          stockS: "",
          stockM: "",
          stockL: "",
          stockXL: "",
          stockXXL: "",
        },
      },
    ],
  });
  const [input, setInput] = useState({
    name: "",
    color: [],
    price: "",
    image: "",
    category: "",
    description: "",
    stock: [
      {
        ColorName: "",
        Sizes: {
          stockXXS: "",
          stockXS: "",
          stockS: "",
          stockM: "",
          stockL: "",
          stockXL: "",
          stockXXL: "",
        },
      },
      {
        ColorName: "",
        Sizes: {
          stockXXS: "",
          stockXS: "",
          stockS: "",
          stockM: "",
          stockL: "",
          stockXL: "",
          stockXXL: "",
        },
      },
    ],
  });
  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value, //VER si esta guardando todo bien
    });
    setError(validate({ ...input, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(input));
    setInput({
      name: "",
      color: [],
      price: "",
      image: "",
      category: "",
      description: "",
      stock: [
        {
          ColorName: "",
          Sizes: {
            stockXXS: "",
            stockXS: "",
            stockS: "",
            stockM: "",
            stockL: "",
            stockXL: "",
            stockXXL: "",
          },
        },
        {
          ColorName: "",
          Sizes: {
            stockXXS: "",
            stockXS: "",
            stockS: "",
            stockM: "",
            stockL: "",
            stockXL: "",
            stockXXL: "",
          },
        },
      ],
    });
    setError({
      name: "",
      color: [],
      price: "",
      image: "",
      category: "",
      description: "",
      stock: [
        {
          ColorName: "",
          Sizes: {
            stockXXS: "",
            stockXS: "",
            stockS: "",
            stockM: "",
            stockL: "",
            stockXL: "",
            stockXXL: "",
          },
        },
        {
          ColorName: "",
          Sizes: {
            stockXXS: "",
            stockXS: "",
            stockS: "",
            stockM: "",
            stockL: "",
            stockXL: "",
            stockXXL: "",
          },
        },
      ],
    });
    e.target.reset();
    alert("Post created!");
  }; //esto deberia aparecer mas adelante cuando se guardo en la db
  const handleCategoriesChange = (event) => {
    const selectedCategory = event.target.value;
    const checkboxes = document.querySelectorAll(".luchi");
    //Desmarca todas las casillas
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    //Marca la casilla
    event.target.checked = true;
    setInput({ ...input, category: selectedCategory });
  };
  //   const handleSizesChange = (e) => {
  //     const selectedSizes = [...input.colors[index].Sizes];
  //     if (e.target.checked) {
  //       if (!selectedCategories.includes(e.target.value)) {
  //         selectedCategories.push(e.target.value);
  //       }
  //     } else {
  //       const index = selectedCategories.indexOf(e.target.value);
  //       if (index > -1) {
  //         selectedCategories.splice(index, 1);
  //       }
  //     }
  //     setInput({ ...input, category: selectedCategories })}
  return (
    <div className={styles.body}>
      {" "}
      <form onSubmit={(e) => handleSubmit(e)}>
        {" "}
        <div className={styles.nav}>
          {" "}
          <h1>Publicate</h1> <button className={styles.button}>Create</button>
          <Link to="/">
            {" "}
            <button className={styles.button}>Back</button>{" "}
          </Link>{" "}
        </div>
        <div className={styles.statsAndTypes}>
          {" "}
          <div className={styles.stats}>
            {" "}
            <h3>Characteristics</h3>
            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  type="text"
                  name="name"
                  id="input-text"
                  spellCheck="false"
                  value={input.name}
                  onChange={handleInputChange}
                />{" "}
                {error.name && <p>{error.name}</p>}{" "}
                <span className={styles.placeholder}>Name</span>
              </div>{" "}
            </div>
            {/* colors: [{ColorName: "", Sizes :[{ SizeName:''}]}], */}
            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  type="text"
                  name="color1"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.attack}
                  onChange={handleInputChange}
                />
                <span className={styles.placeholder}>Color 1</span>
              </div>
            </div>
            <div className={styles.size}>
              <h7>Sizes color 1</h7>
              <div className={styles.typesOrder}>
                {sizes.map((e) => (
                  <div className={styles.container}>
                    <ul className={styles.ksCboxtags}>
                      <li>
                        <input
                          // onChange={handleSizesChange}
                          type="checkbox"
                          id={e}
                          value={e}
                        />
                        <label htmlFor={e}>{e}</label>
                        {stock.map((stock) => (
                          <div>
                            <input
                              type="number"
                              id={`${stock}${e}`}
                              // value={input.color[0].SizeName[0].stock}
                            />
                            <label htmlFor={stock}>{stock}</label>
                          </div>
                        ))}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  type="text"
                  name="color2"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.attack}
                  onChange={handleInputChange}
                />
                <span className={styles.placeholder}>Color 2</span>
              </div>
            </div>
            <div className={styles.size}>
              <h7>Sizes color 2</h7>

              <div className={styles.typesOrder}>
                {sizes.map((e) => (
                  <div className={styles.container}>
                    <ul className={styles.ksCboxtags}>
                      <li>
                        <input
                          // onChange={handleSizesChange}
                          type="checkbox"
                          id={e}
                          value={e}
                        />

                        <label htmlFor={e}>{e}</label>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.centralize}>
              {" "}
              <div className={styles.inputBlock}>
                <input
                  type="number"
                  name="price"
                  id="input-text"
                  spellCheck="false"
                  value={input.price}
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
                        className="luchi"
                        onChange={handleCategoriesChange}
                        type="checkbox"
                        id={e}
                        value={e}
                      />
                      <label htmlFor={e}>{e}</label>
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
