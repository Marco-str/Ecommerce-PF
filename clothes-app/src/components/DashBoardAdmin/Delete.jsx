import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../../redux/actions/actions.js";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./Delete.module.css";
import Swal from "sweetalert2";
import axios from "axios";

export default function Delete() {
  const [borrar, setBorrar] = useState(false);
  const [errors, setErrors] = useState({ noInputs: "No hay inputs" });
  const [input, setInputs] = useState({ id: "" });
  const [input2, setInputs2] = useState({ id: "" });
  const [input3, setInputs3] = useState({ id: "" });
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedProductNames2, setSelectedProductNames2] = useState("");
  const [selectedProductNames3, setSelectedProductNames3] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = function (e) {
    const productId = e.target.value;
    const product = getProductById(productId);
    const productName = product.name;
    setErrors(validate({ ...input, id: productId }));
    setInputs({ id: productId });
    setSelectedProductName(productName);
  };

  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const productsNotAvailable = products.filter((product) => !product.isAvaible);
  const productsIsAvailable = products.filter((product) => product.isAvaible);

  function toggle() {
    setBorrar(!borrar);
  }

  function deletee(input) {
    dispatch(deleteProduct(input.id));
    setInputs2({ id: "" });
    setBorrar(false);
    setShowAlert(true);
    setSelectedProductName("");
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  const handleDespausarProducto = async (e) => {
    const productIds = e?.target.value;
    const productImg = getProductById(productIds);
    const productNames = productImg?.name;
    const pausado = { ...productImg, isAvaible: true };
    setInputs3({ id: productIds });
    setSelectedProductNames3(productNames);
    try {
      await axios.put(`/products/${input3.id}`, pausado);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePausarProducto = async (e) => {
    const productIds = e?.target.value;
    const productImg = getProductById(productIds);
    const productNames = productImg?.name;
    const pausado = { ...productImg, isAvaible: false };
    setInputs2({ id: productIds });
    setSelectedProductNames2(productNames);
    try {
      await axios.put(`/products/${input2.id}`, pausado);
    } catch (error) {
      // Maneja el error aquí
    }
  };

  function isNotEmpty(obj) {
    return Object.keys(obj).length !== 0;
  }

  function getProductById(productId) {
    return products.find((product) => product.id === productId);
  }

  function confirmDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletee(input);
        Swal.fire("Deleted!", "The Clothe has been deleted.", "Success");
        // window.location.reload();
      }
    });
  }

  function confirmPause() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will to get this clothe out from your avaiable stock !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want to do!",
    }).then((result) => {
      if (result.isConfirmed) {
        handlePausarProducto();
        Swal.fire(
          "Desactive!",
          "The Clothe have been pick out from estock",
          "Success"
        );
      }
    });
  }

  function confirmDespause() {
    Swal.fire({
      title: "Are you sure?",
      text: "You would ike to List this Clothe Again?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Active Again!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDespausarProducto();
        Swal.fire("Activated!", "Your Clothe is Active Again", "Success");
        // window.location.reload();
      }
    });
  }

  return (
    <div className={styles.main_container}>
      {/* <h1 className={styles.title_h1}>Management of Products</h1> */}

      <div className={styles.container}>
        {/* ================================================================================ */}
        {/* BORRAR PRODUCTO */}

        <div className={styles.containerPause}>
          <div className={styles.containerTitleandSvg}>
            <h1 className={styles.title_1}>Delete Products</h1>
          </div>
          <form className={styles.form_container}>
            <select
              name="id"
              className={styles.select_se}
              value={input.id}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                SELECT PRODUCT
              </option>
              {products.map((product) => {
                return (
                  <option
                    key={product.id}
                    value={product.id}
                    className={styles.options_values}
                  >
                    {product.name}
                  </option>
                );
              })}
            </select>
            {errors.id && <p>{errors.id}</p>}

            {selectedProductName && (
              <div className={styles.card_body}>
                <img
                  src={getProductById(input.id)?.image}
                  alt="Product"
                  className={styles.imgen}
                />
              </div>
            )}
            {selectedProductName && (
              <div className={styles.card_body}>
                <p>{getProductById(input.id)?.name}</p>
                <p>
                  <span className={styles.span}>Price:</span>{" "}
                  {getProductById(input.id)?.price}
                </p>
              </div>
            )}
          </form>

          <div className={styles.centerButtonsCotnainer}>
            <button
              className={styles.button_pause2delete}
              onClick={confirmDelete}
              disabled={isNotEmpty(errors)}
            >
              <h3 className={styles.textButtons}>Delete Product</h3>

              <svg
                className={styles.svgButtons}
                width="40px"
                height="40px"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 6.5H20M10 6.5V4.5C10 3.94772 10.4477 3.5 11 3.5H14C14.5523 3.5 15 3.94772 15 4.5V6.5M12.5 9V17M15.5 9L15 17M9.5 9L10 17M18.5 6.5L17.571 18.5767C17.5309 19.0977 17.0965 19.5 16.574 19.5H8.42603C7.90349 19.5 7.46905 19.0977 7.42898 18.5767L6.5 6.5H18.5Z"
                  stroke="#121923"
                  stroke-width="1.2"
                />
              </svg>
            </button>
          </div>
          {borrar && (
            <div className="container">
              <div className="row">
                <div className="col align-self-center">
                  <div className="card-body">
                    <button className="btn btn-danger" onClick={toggle}>
                      Not
                    </button>
                    <button
                      className={styles.button_delete}
                      onClick={confirmDelete}
                      type="submit"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showAlert && selectedProductName && (
            <div className="alert alert-success mt-3" role="alert">
              ¡The clothe {selectedProductNames2} have been erase succesufully!
            </div>
          )}
        </div>

        {/* ================================================================================ */}
        {/* PAUSAR PRODUCTO */}

        <div className={styles.containerPause}>
          <h1 className={styles.title_1}>Take Out</h1>
          <form className={styles.form_container}>
            <select
              name="id"
              className={styles.select_se}
              value={input2.id}
              onChange={handlePausarProducto}
            >
              <option value="" disabled>
                SELECT PRODUCT
              </option>
              {productsIsAvailable.map((product) => {
                return (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                );
              })}
            </select>

            {selectedProductNames2 && (
              <div className={styles.card_body}>
                <img
                  src={getProductById(input2.id)?.image}
                  alt="Product"
                  className={styles.imgen}
                />
              </div>
            )}
            {selectedProductName && (
              <div className={styles.card_body}>
                <p>{getProductById(input2.id)?.name}</p>
                <p>
                  <span className={styles.span}></span> $
                  {getProductById(input2.id)?.price}
                </p>
              </div>
            )}
          </form>

          <div className={styles.centerButtonsCotnainer}>
            <button
              className={styles.button_pause2pause}
              onClick={confirmPause}
              // disabled={isNotEmpty(errors)}
            >
              <h3 className={styles.textButtons}>Take Off</h3>
              <div>
                <svg
                  className={styles.svgButtons}
                  width="40px"
                  height="40px"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.5 7.5H8.5V17.5H10.5V7.5ZM16.5 7.5H14.5V17.5H16.5V7.5Z"
                    fill="#121923"
                  />
                  <path
                    d="M8.5 7.5V6.9H7.9V7.5H8.5ZM10.5 7.5H11.1V6.9H10.5V7.5ZM8.5 17.5H7.9V18.1H8.5V17.5ZM10.5 17.5V18.1H11.1V17.5H10.5ZM14.5 7.5V6.9H13.9V7.5H14.5ZM16.5 7.5H17.1V6.9H16.5V7.5ZM14.5 17.5H13.9V18.1H14.5V17.5ZM16.5 17.5V18.1H17.1V17.5H16.5ZM8.5 8.1H10.5V6.9H8.5V8.1ZM9.1 17.5V7.5H7.9V17.5H9.1ZM10.5 16.9H8.5V18.1H10.5V16.9ZM9.9 7.5V17.5H11.1V7.5H9.9ZM14.5 8.1H16.5V6.9H14.5V8.1ZM15.1 17.5V7.5H13.9V17.5H15.1ZM16.5 16.9H14.5V18.1H16.5V16.9ZM15.9 7.5V17.5H17.1V7.5H15.9Z"
                    fill="#121923"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------------------- */}
        {/* DESPAUSAR */}

        <div className={styles.containerPause}>
          <h1 className={styles.title_1}>Turn Back</h1>
          <form className={styles.form_container}>
            <select
              className={styles.select_se}
              name="id"
              value={input3.id}
              onChange={handleDespausarProducto}
            >
              <option value="" disabled>
                SELECT PRODUCT
              </option>

              {productsNotAvailable.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>

            {selectedProductNames3 && (
              <div className={styles.card_body}>
                <img
                  src={getProductById(input3.id)?.image}
                  alt="Product"
                  className={styles.imgen}
                />
                <span>{}</span>
              </div>
            )}
            {selectedProductName && (
              <div className={styles.card_body}>
                <p>{getProductById(input3.id)?.name}</p>
                <p>
                  <span className={styles.span}></span> $
                  {getProductById(input3.id)?.price}
                </p>
              </div>
            )}
          </form>

          <div className={styles.centerButtonsCotnainer}>
            <button
              className={styles.button_pause2}
              onClick={confirmDespause}
              // disabled={isNotEmpty(errors)}
            >
              <h3 className={styles.textButtons}>Publish Product</h3>
              <div>
                <svg
                  className={styles.svgButtons}
                  width="70px"
                  height="70px"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 16.5V8.5L16 12.5L10 16.5Z" fill="#121923" />
                </svg>
              </div>
            </button>
          </div>

          {false && (
            <div className="container">
              <div className="row">
                <div className="col align-self-center">
                  <div className="card-body">
                    <button className={styles.button_despause} onClick={toggle}>
                      No
                    </button>
                    <button
                      className={styles.button_despause}
                      onClick={confirmDespause}
                      type="submit"
                    >
                      Sí
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================================================================================ */}
      </div>
      <div className={styles.containerButtonBack}>
        <Link to="/DashBoardAdmin">
          <button className={styles.button}>
            Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
          </button>
        </Link>
      </div>
    </div>
  );
}

export function validate(input) {
  let errors = {};
  if (!input.id) errors.id = "Seleccione una prenda para borrar";
  return errors;
}
