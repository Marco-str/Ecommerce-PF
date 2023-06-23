import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProducts } from "../../redux/actions/actions.js";
import axios from "axios";
import styles from "./CreatePost.module.css";
import { FaArrowLeft } from "react-icons/fa";
import UploadFile from "../UploadFile/UploadFile";
import Swal from "sweetalert2";

export default function CreatePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const [allCategories, setAllCategories] = useState("All categories");

  /************************************************************************************************************ */

  const [input, setInput] = useState({
    id: 0,
    name: "",
    color: [],
    price: 0,
    image:
      "https://marketplace.canva.com/EAFBKs7K_lE/1/0/1600w/canva-colorful-variety-of-clothes-hanging-on-rack-new-arrival-instagram-post-wBkgRMEh93E.jpg",
    category: "",
    parentCategory: "",
    description: "",
  });

  const [error, setError] = useState({
    name: "",
    color: "",
    price: "",
    image: "",
    category: [],
    description: "",
  });

  /************************************************************************************************************ */

  useEffect(() => {
    function generarNumeroAleatorio() {
      let numerosDisponibles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let numeroGenerado = "";

      for (let i = 0; i < 4; i++) {
        const indiceAleatorio = Math.floor(
          Math.random() * numerosDisponibles.length
        );
        const digito = numerosDisponibles.splice(indiceAleatorio, 1)[0];
        numeroGenerado += digito.toString();
      }

      return numeroGenerado;
    }

    setInput((prevInput) => ({
      ...prevInput,
      id: generarNumeroAleatorio(),
    }));
  }, []);

  /************************************************************************************************************ */

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    if (name === "color") {
      const colorsArray = value.split(",").map((color) => ({
        name: color.trim(),
        // otros atributos que necesites para el color
      }));

      setInput((prevInput) => ({
        ...prevInput,
        [name]: colorsArray,
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  }, []);

  const changeHandler = useCallback((event) => {
    const { name, value } = event.target;
    if (name === "category") {
      setAllCategories(value);
    }
    setInput((prevInput) => ({
      ...prevInput,
      [name]: name === "id" ? parseInt(value) : value,
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  }, []);

  /************ ***************************************************************************************** */

  const submitHandler = async (e) => {
    e.preventDefault();

    const formErrors = validate(input); // Validar el formulario
    setError(formErrors); // Establecer los errores en el estado

    if (Object.keys(formErrors).length === 0) {
      try {
        await axios.post("/products", input);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your clothe has been saved successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/detail/${input.id}`);
      } catch (error) {
        alert(error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: error,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    }
  };

  /*********************************** CLOUDINARY ************************************************************************* */

  const handleUpload = useCallback(async (error, result) => {
    if (result && result.event === "success") {
      setInput((prevInput) => ({
        ...prevInput,
        image: result.info.secure_url,
      }));
    }
  }, []);

  /************************************ VALIDACIONES ************************************************************************ */

  const validate = (input) => {
    let error = {};
    if (!input.name) {
      error.name = "Name is required";
    }
    if (!input.color) {
      error.color = "Color is required";
    }
    if (input.color.length === 0 || input.color === "") {
      error.color = "Color is required";
    }
    if (input.color.length > 0 && input.color.length < 1) {
      error.color = "You must enter at least 1 colors";
    }
    if (!input.price && input.price === 0) {
      error.price = "Price is required";
    }
    if (input.price < 0.5 || input.price > 500) {
      error.price = "Price must be between 0.5 and 500";
    }
    if (!input.category) {
      error.category = "Category is required";
    }
    if (!input.description) {
      error.description = "Description is required";
    }
    return error;
  };

  useEffect(() => {
    setError(validate(input));
  }, [input]);
  /******************************************************************************************************** */

  return (
    <div className={styles.mainContainerCreate}>
      <div className={styles.containerButtonback}>
        <Link to="/DashBoardAdmin">
          <button className={styles.button}>
            Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
          </button>
        </Link>
      </div>
      <div className={styles.body_container}>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.statsAndTypes}>
            <div className={styles.stats}>
              <h1>Create New Clothe </h1>

              {/* /********************************************************************************* */}

              <div className={styles.inputBlock}>
                <p className={styles.label_name}>Name Clothe:</p>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.name}
                  onChange={changeHandler}
                />

                {error.name ? (
                  <p className={styles.error}>{error.name}</p>
                ) : (
                  <span></span>
                )}
              </div>

              {/* /********************************************************************************* */}
              <div className={styles.centerS}>
                <div className={styles.felx_container}>
                  <img
                    src={input.image}
                    className={styles.imgPreview}
                    alt={input.name}
                    width="250"
                    height="250"
                  />

                  <div className={styles.updateStyles}>
                    <UploadFile
                      handleUpload={handleUpload}
                      folder={"product"}
                    ></UploadFile>
                  </div>
                </div>
              </div>
              <div className={styles.price_container}>
                <div>
                  <p className={styles.label_name}>Price</p>
                  <div className={styles.centerInputNumber}>
                    <input
                      className={styles.inputNumber}
                      type="number"
                      name="price"
                      id="input-text"
                      min="0.5"
                      max="500"
                      step="0.5"
                      required
                      spellCheck="false"
                      value={input.price}
                      onChange={changeHandler}
                    />
                  </div>
                </div>
                {error.price ? (
                  <p className={styles.error2}>{error.price}</p>
                ) : (
                  <span></span>
                )}
              </div>

              {/* /********************************************************************************* */}

              <div className={styles.inputBlock}>
                <p htmlFor="color" className={styles.label_name}>
                  Color:
                </p>
                <div className={styles.centerInputs}>
                  <input
                    className={styles.input}
                    type="text"
                    name="color"
                    id="color"
                    onChange={handleChange}
                    value={input.color.map((color) => color.name).join(",")}
                    placeholder='Must use "," for separate each color'
                  />
                </div>
                {error.color ? (
                  <p className={styles.error}>{error.color}</p>
                ) : (
                  <span></span>
                )}
              </div>

              {/* /********************************************************************************* */}

              <div className={styles.inputBlock}>
                <p className={styles.label_name}>Description :</p>
                <input
                  className={styles.input}
                  type="text"
                  name="description"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.description}
                  onChange={changeHandler}
                />

                {error.description ? (
                  <p className={styles.error}>{error.description}</p>
                ) : (
                  <span></span>
                )}
              </div>

              {/* /********************************************************************************* */}

              <div className={styles.inputBlock}>
                <p htmlFor="" className={styles.label_name}>
                  Category:
                </p>
                <div className={styles.centerSelects}>
                  <select
                    className={styles.select}
                    value={input.category}
                    name="category"
                    onChange={changeHandler}
                  >
                    <option value="">{allCategories}</option>
                    {uniqueCategories.map((category) => {
                      const newString = category.replace(/_/g, " ");
                      const transformedCategory =
                        newString.charAt(0).toUpperCase() + newString.slice(1);
                      return (
                        <option
                          className={styles.category}
                          value={category}
                          key={category}
                        >
                          {transformedCategory}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {error.category ? (
                  <p className={styles.error}>{error.category}</p>
                ) : (
                  <span></span>
                )}
              </div>

              {/* /*********************************************************************************       */}
              <div className={styles.inputBlock}>
                <p className={styles.label_name}>Parent Category:</p>
                <input
                  className={styles.input}
                  type="text"
                  name="parentCategory"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.category}
                  onChange={changeHandler}
                />

                {/* {error.category && <p>{error.category}</p>} */}
                {error.category ? (
                  <p className={styles.error}>{error.category}</p>
                ) : (
                  <span></span>
                )}
              </div>

              {/* /**************************************************************************************************** * */}
            </div>
          </div>

          {/* /**************************************  BOTON CREATE  *********************************************** * */}
          {Object.keys(error).length === 0 ? (
            <button className={styles.enviar} type="submit">
              {" "}
              Create{" "}
            </button>
          ) : null}
          {Object.keys(error).length === 0 && (
            <p>The Form has been validate </p>
          )}
        </form>
      </div>
    </div>
  );
}
