import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getDetail } from "../../redux/actions/actions.js";
import { FaArrowLeft } from "react-icons/fa";

import UploadFile from "../UploadFile/UploadFile.jsx";

import styles from "./EditProduct.module.css";
import Swal from "sweetalert2";

import axios from "axios";

const EditProduct = () => {
  const navigate = useNavigate();

  /*************************ESTO ES PARA MONTAR LA CARTA*********************************************** */
  const dispatch = useDispatch();
  const { id } = useParams();
  
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);
  const state = useSelector((state) => state.productDetail);
  const {
    name,
    color,
    price,
    image,
    category,
    parentCategory,
    description,
    stock,
  } = state;

  /*****************************ESTO ES DEL FORMULARIO************************************************ */
  const [url, setUrl] = useState("");
  const [form, setForm] = useState({});
  useEffect(() => {
    setForm({
      ...form,
      id: id,
      name,
      color,
      price,
      image,
      category,
      parentCategory,
      description,
      stock,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  useEffect(() => {
    setUrl(state?.image);
  }, [setUrl, state.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      const colorsArray = value.split(",").map((color) => ({
        name: color.trim(),
        // otros atributos que necesites para el color
      }));

      setForm((prevForm) => ({
        ...prevForm,
        [name]: colorsArray,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/products/${id}`, form).then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate(`/detail/${id}`);
        });
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  const handleUpload = async (error, result) => {
    if (result && result.event === "success") {
      setUrl(result.info.secure_url);
      setForm({ ...form, image: result.info.secure_url });
    }
  };

  return (
    <>
      {/* /**************************************************************************************** */}

      <div className={styles.main_container}>
        <div className={styles.info_container}>
          <h1 className={styles.title_edit}>PRODUCT DATA</h1>
          <h3>{state?.name}</h3>
          <img src={url} alt={state?.name} className={styles.image_edit} />

          <h3>${state?.price}</h3>
        <div  className={styles.color_product}>
          <label htmlFor="color">Color:</label>
          <select type="select" name="color" className={styles.option_edit}>
            <option> None</option>
            {state?.color &&
              state.color.map((e) => (
                <option name={e.ColorName} key={e.ColorName}>
                  {e.ColorName}
                </option>
              ))}
          </select>
              </div>

          <label htmlFor="">Description:</label>
          {/* <p>{state?.description}</p> */}
          <div dangerouslySetInnerHTML={{ __html: state?.description }} className={styles.description_edit}></div>

          <Link to="/home">
            <button className={styles.button_editprodutcs}>
              Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
            </button>
          </Link>
        </div>

        {/* /**************************************************************************************** */}

        <div className={styles.form_container}>
          <form action="" onSubmit={handleSubmit}>
            <h1 className={styles.title_edit}>EDIT PRODUCT</h1>

            <label htmlFor="name">Name</label>
            <input
              className={styles.input_edit}
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={form.name}
            />

            <label htmlFor="image">Image</label>
            <input
              className={styles.input_edit}
              type="text"
              name="image"
              id="imagen"
              onChange={handleChange}
              value={form.image}
              placeholder="Could copy from URL"
            />
            <UploadFile handleUpload={handleUpload} folder={"product"} />

            <label htmlFor="price">Price</label>
            <input className={styles.input_edit}
              type="number"
              name="price"
              id="price"
              onChange={handleChange}
              value={form.price}
            />

            {/* <label htmlFor="color">Colors</label>
              <input 
              type="text"
              name="color"
              id="color"
              onChange={handleChange}
              value={form.color} /> */}

            <label htmlFor="category">Category</label>
            <input className={styles.input_edit}
              type="text"
              name="category"
              id="category"
              onChange={handleChange}
              value={form.category}
            />

            <label htmlFor="parentCategory">parentCategory</label>
            <input className={styles.input_edit}
              type="text"
              name="parentCategory"
              id="description"
              onChange={handleChange}
              value={form.parentCategory}
            />

            <label htmlFor="description">Description</label>
            <input className={styles.input_edit}
              type="textarea"
              name="description"
              id="description"
              onChange={handleChange}
              value={form.description}
            />

            <label htmlFor="stock">Stock</label>
            <input className={styles.input_edit}
              type="number"
              name="stock"
              id="stock"
              onChange={handleChange}
              value={form.stock}
            />

            <button type="submit" className={styles.button_editprodutcs}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
