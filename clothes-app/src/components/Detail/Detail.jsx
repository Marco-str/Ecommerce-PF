import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  getDetail,
  addCart,
  getUserById,
  getCart,
} from "../../redux/actions/actions.js";
import { FaCartArrowDown, FaArrowLeft } from "react-icons/fa";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import axios from "axios";
import styles from "./detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { state, idUser, user, carritoState } = useSelector((state) => {
    return {
      state: state.productDetail,
      idUser: state.idUsuario,
      user: state.userId,
      carritoState: state.cart,
    };
  });

  const [card, setCard] = useState(false);
  const [card2, setCard2] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setCard2(true);
    if (Array.isArray(carritoState)) {
      const foundItem = carritoState.some((item) => item.id === id);
      setCard2(foundItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carritoState]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        dispatch(getCart());
      } catch (error) {}
    };
    fetchCart();
  }, [dispatch]);

  if (user.length !== 0) localStorage.setItem("users", user.name);
  if (idUser.length !== 0) localStorage.setItem("idUsers", idUser);

  const idUsers = localStorage.getItem("ids");

  const fecha = {
    fecha: new Date(),
  };

  const [form, setForm] = useState({
    review: "",
    rating: 5,
    date: fecha.fecha + "",
    UserId: idUsers,
    ClotheId: id,
  });

  const hanleChange = (event) => {
    const { value, name } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/products/${id}/reviews`);
        setComments(response.data); // Asignar los comentarios a la variable 'comments'
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/products/${id}/reviews`, JSON.stringify(form), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Formulario enviado correctamente");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  const handleAddCart = () => {
    dispatch(addCart(state));
    const listaCart = JSON.parse(localStorage.getItem("carritoLS")) || [];
    setCard(false);
    for (let i = 0; i < listaCart.length; i++) {
      if (
        listaCart[i].id === state.id &&
        listaCart[i].quantity === state.stock
      ) {
        setCard(true);
        break;
      }
    }
    if (card) {
      Swal.fire({
        text: "There is no more stock of this product!",
        icon: "info",
        footer: '<a href="/carrito">Would you like to see your cart?</a>',
      });
    } else {
      let updatedCart = [...listaCart];
      let productIndex = updatedCart.findIndex((item) => item.id === state.id);

      if (productIndex !== -1) {
        if (updatedCart[productIndex].quantity < state.stock) {
          updatedCart[productIndex].quantity += 1;
        } else {
          Swal.fire({
            text: "There is no more stock of this product!",
            icon: "info",
            footer: '<a href="/carrito">Would you like to see your cart?</a>',
          });
          return;
        }
      } else {
        updatedCart.push({ ...state, quantity: 1 });
      }

      localStorage.setItem("carritoLS", JSON.stringify(updatedCart));
      Swal.fire({
        icon: "success",
        title: "¡Su producto se ha agregado al carrito!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const stock = state.stock;

      if (stock === 1 || stock === 2 || stock === 3) {
        Swal.fire({
          title: "Apurate!",
          text: "Quedan pocas unidades en stock",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      } else if (stock === 0) {
        Swal.fire({
          title: "No quedan más unidades disponibles!",
          text: "Lo sentimos por las molestias...",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      }
    }, 1000); // Retraso de 1 segundo (1000 milisegundos)

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [state.stock]);

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getUserById(idUsers));
  }, [dispatch, id, idUsers]);

  //Logica de galeria img
  const [coloresPrt, setColoresPrt] = useState([]);
  const [sizesArr, setSizeArr] = useState([]);
  const [numberImg, setNumberImg] = useState(0);

  function handleChange(e) {
    if (e.target.value === "None") {
      setColoresPrt([]);
    } else {
      setColoresPrt(clrPrdct(e.target.value));
      setSizeArr(findArrSize(e.target.value));
    }
  }

  const findArrSize = (valorBuscado) => {
    for (let i = 0; i < state.color.length; i++) {
      if (state.color[i].ColorName === valorBuscado) {
        return state.color[i].Sizes;
      }
    }
    return null;
  };

  const clrPrdct = (valorBuscado) => {
    for (let i = 0; i < state.color.length; i++) {
      if (state.color[i].ColorName === valorBuscado) {
        return state.color[i].ProductImages;
      }
    }
    return null;
  };

  const changeLeft = () => {
    if (numberImg > 0) {
      setNumberImg(numberImg - 1);
    } else {
      setNumberImg(coloresPrt.length - 1);
    }
  };

  const changeRigth = () => {
    if (numberImg < coloresPrt.length - 1) {
      setNumberImg(numberImg + 1);
    } else {
      setNumberImg(0);
    }
  };

  const arrayColor =
    state?.color &&
    state?.color.map((e) => (e.ColorName ? e.ColorName : e.name));
  return (
    <div>
      <div className={styles.back}>
        <div className={styles.mainContainer}>
          <div className={styles.productImg}>
            <h3>{state?.name}</h3>
            <div className={styles.img}>
              {coloresPrt && !!coloresPrt.length ? (
                <div className={styles.divGaleryImg}>
                  <button onClick={changeLeft} className={styles.bttnArrow}>
                    <MdOutlineArrowBackIos />
                  </button>
                  <img
                    src={coloresPrt[numberImg]}
                    alt={state?.name}
                    className={styles.imgProducto}
                  />
                  <button onClick={changeRigth} className={styles.bttnArrow}>
                    <MdOutlineArrowForwardIos />
                  </button>
                </div>
              ) : (
                <img
                  src={state?.image}
                  alt={state?.name}
                  className={styles.imgProducto}
                />
              )}
            </div>
            <div className={styles.buyNow}>
              <h1>${state?.price}</h1>
            </div>

            <div className={styles.containerSA}>
              <label htmlFor="color">Color:</label>
              <select
                className={styles.buttonSelect}
                type="select"
                name="color"
                onChange={handleChange}
              >
                <option className={styles.option}>None</option>
                {arrayColor &&
                  arrayColor.map((e) => (
                    <option className={styles.option} name={e} key={e}>
                      {e}
                    </option>
                  ))}
              </select>
              <div>
                <label htmlFor="color">Size:</label>
                <select
                  className={styles.buttonSelect}
                  type="select"
                  name="size" /* onChange={handleChange} */
                >
                  <option className={styles.option}>None</option>
                  {sizesArr ? (
                    sizesArr.map((e) => (
                      <option
                        className={styles.option}
                        name={e.SizeName}
                        key={e.SizeName}
                      >
                        {e.SizeName}
                      </option>
                    ))
                  ) : (
                    <option
                      className={styles.option}
                      name="default"
                      key="default"
                    >
                      One size
                    </option>
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.description}>
              <div
                className={styles.textss}
                dangerouslySetInnerHTML={{ __html: state?.description }}
              ></div>
            </div>
            <div className={styles.cart}>
              {card === true ? (
                <button className={styles.button} onClick={handleAddCart}>
                  Out of stock
                </button>
              ) : state.stock === 0 ? null : (
                <button className={styles.button} onClick={handleAddCart}>
                  {card2 === true ? "Add one more" : "Add to cart"}
                  <FaCartArrowDown className={styles.icon}></FaCartArrowDown>
                </button>
              )}

              <NavLink to="/home">
                <button className={styles.button}>
                  Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.back2}>
        {comments.length === 0 ? (
          <div className={styles.reviewss2}>
            <h2 className={styles.sinPro}>
              Todavía no hay comentarios sobre este producto.
            </h2>
          </div>
        ) : (
          <div className={styles.reviewss}>
            {comments.map((comment) => (
              <div key={comment.id}>
                <p className={styles.info}>Review: {comment.review}</p>
                <p className={styles.info}>Rating:</p>
                {Array.from({ length: comment.rating }).map((_, index) => (
                  <svg
                    className={styles.stars}
                    key={index}
                    width="0px"
                    height="20px"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 4L15.2747 9.8691L21.5595 10.2188L16.6806 14.1959L18.2901 20.2812L13 16.87L7.70993 20.2812L9.31941 14.1959L4.44049 10.2188L10.7253 9.8691L13 4Z"
                      stroke="#121923"
                      strokeWidth="1.2"
                    />
                  </svg>
                ))}
                <p className={styles.info}>
                  Day:
                  <p className={styles.info}>
                    {new Date(comment.date).toLocaleString([], {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </p>
              </div>
            ))}
          </div>
        )}

        <h1>Agregue su comentario</h1>
        <form action="" onSubmit={submitHandler}>
          <div className={styles.enviarBut}>
            <label htmlFor="">Review</label>

            <input
              name="review"
              value={form.review}
              onChange={hanleChange}
              className={styles.inputC}
              type="text"
            ></input>

            <label htmlFor="">Rating</label>

            <input
              name="rating"
              value={form.rating}
              onChange={hanleChange}
              className={styles.inputC}
              type="range"
              min="1"
              max="5"
              step="1"
            />

            <span>{form.rating}</span>

            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
