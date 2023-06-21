import React from "react";
import style from "./Nav.module.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/actions/actions";
import { useEffect } from "react";

const Nav = () => {
  const iniciado = useSelector((state) => state.iniciado);
  const userId = useSelector((state) => state.userId);
  const carritoState = useSelector((state) => state.cart);
  // console.log(userId.Clothes, "asdasd")

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
    // dispatch(getUser(userId.id))
  }, [dispatch]);

  const id = userId.id;

  if (iniciado?.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("sesions", iniciado);
  }

  const sesions = localStorage.getItem("sesions");

  //const [isLoggedIn, setIsLoggedIn] = useState();

  return (
    <div className={style.mainContainer}>
      <Link className={style.link} to="/">
        <h1 className={style.titleEspecial}>ClotheStore</h1>
      </Link>

      <SearchBar />

      <div className={style.loginSing}>
        <React.Fragment>
          <div className={style.contenedor_imagen}>
            {userId.admin === true && sesions === "si" ? (
              <Link to="/DashBoardAdmin">
                <svg
                  className={style.svg2}
                  width="80px"
                  height="80px"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2624 5.40607L13.8714 4.42848C13.6471 3.86771 13.104 3.5 12.5 3.5C11.896 3.5 11.3529 3.86771 11.1286 4.42848L10.7376 5.40607C10.5857 5.78585 10.2869 6.08826 9.90901 6.2448C9.53111 6.40133 9.10603 6.39874 8.73006 6.23761L7.76229 5.82285C7.20716 5.58494 6.56311 5.70897 6.13604 6.13604C5.70897 6.56311 5.58494 7.20716 5.82285 7.76229L6.23761 8.73006C6.39874 9.10602 6.40133 9.53111 6.2448 9.90901C6.08826 10.2869 5.78585 10.5857 5.40607 10.7376L4.42848 11.1286C3.86771 11.3529 3.5 11.896 3.5 12.5C3.5 13.104 3.86771 13.6471 4.42848 13.8714L5.40607 14.2624C5.78585 14.4143 6.08826 14.7131 6.2448 15.091C6.40133 15.4689 6.39874 15.894 6.23761 16.2699L5.82285 17.2377C5.58494 17.7928 5.70897 18.4369 6.13604 18.864C6.56311 19.291 7.20716 19.4151 7.76229 19.1772L8.73006 18.7624C9.10603 18.6013 9.53111 18.5987 9.90901 18.7552C10.2869 18.9117 10.5857 19.2141 10.7376 19.5939L11.1286 20.5715C11.3529 21.1323 11.896 21.5 12.5 21.5C13.104 21.5 13.6471 21.1323 13.8714 20.5715L14.2624 19.5939C14.4143 19.2141 14.7131 18.9117 15.091 18.7552C15.4689 18.5987 15.894 18.6013 16.2699 18.7624L17.2377 19.1771C17.7928 19.4151 18.4369 19.291 18.864 18.864C19.291 18.4369 19.4151 17.7928 19.1771 17.2377L18.7624 16.2699C18.6013 15.894 18.5987 15.4689 18.7552 15.091C18.9117 14.7131 19.2141 14.4143 19.5939 14.2624L20.5715 13.8714C21.1323 13.6471 21.5 13.104 21.5 12.5C21.5 11.896 21.1323 11.3529 20.5715 11.1286L19.5939 10.7376C19.2141 10.5857 18.9117 10.2869 18.7552 9.90901C18.5987 9.53111 18.6013 9.10602 18.7624 8.73006L19.1772 7.76229C19.4151 7.20716 19.291 6.56311 18.864 6.13604C18.4369 5.70897 17.7928 5.58494 17.2377 5.82285L16.2699 6.23761C15.894 6.39874 15.4689 6.40133 15.091 6.2448C14.7131 6.08826 14.4143 5.78585 14.2624 5.40607Z"
                    stroke="#121923"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M16.5 12.5C16.5 14.7091 14.7091 16.5 12.5 16.5C10.2909 16.5 8.5 14.7091 8.5 12.5C8.5 10.2909 10.2909 8.5 12.5 8.5C14.7091 8.5 16.5 10.2909 16.5 12.5Z"
                    stroke="#121923"
                    strokeWidth="1.2"
                  />
                </svg>
              </Link>
            ) : null}
          </div>
          {sesions === "no" ? (
            <div className={style.buttonsContainer}>
              <Link to="/login">
                <button className={style.buttons}>Login</button>
              </Link>
            </div>
          ) : (
            <div className={style.contenedor_imagen}>
              <Link to="/profile">
                <svg
                  className={style.svg}
                  width="80px"
                  height="80px"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 14.5C7 15 5.5 16 5.5 19.5H19.5C19.5 16 18.3416 15.1708 17 14.5C16 14 14 14 14 12.5C14 11 15 10.25 15 8.25C15 6.25 14 5.25 12.5 5.25C11 5.25 10 6.25 10 8.25C10 10.25 11 11 11 12.5C11 14 9 14 8 14.5Z"
                    stroke="#121923"
                    strokeWidth="1.2"
                  />
                </svg>
              </Link>
            </div>
          )}

          {sesions === "no" ? (
            <div className={style.buttonsContainer}>
              <Link to="/signup">
                <button className={style.buttons}>SingUp</button>
              </Link>

              <Link to="/">
                <button className={style.buttonLanding}>Back</button>
              </Link>
            </div>
          ) : (
            <div className={style.contenedor_imagen}>
              <Link to="/">
                <svg
                  className={style.svg}
                  width="80px"
                  height="80px"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 15V19.5H5.5V5.5H16.5V10M10 12.5H22.5"
                    stroke="#121923"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M20 10L22.5 12.5L20 15"
                    stroke="#121923"
                    strokeWidth="1.2"
                  />
                </svg>
              </Link>
            </div>
          )}

          <div className={style.contenedor_imagen}>
            <div className={style.svg22}>
              <div className={style.containerNumberSvg}>
                {carritoState === null ? (
                  <p className={style.numberCarrito}>0</p>
                ) : (
                  <p className={style.numberCarrito}>{carritoState.length}</p>
                )}
                <Link to="/carrito">
                  <svg
                    className={style.svg33}
                    width="80px"
                    height="80px"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 17.5L5.81763 6.26772C5.71013 5.81757 5.30779 5.5 4.84498 5.5H3M8 17.5H17M8 17.5C8.82843 17.5 9.5 18.1716 9.5 19C9.5 19.8284 8.82843 20.5 8 20.5C7.17157 20.5 6.5 19.8284 6.5 19C6.5 18.1716 7.17157 17.5 8 17.5ZM17 17.5C17.8284 17.5 18.5 18.1716 18.5 19C18.5 19.8284 17.8284 20.5 17 20.5C16.1716 20.5 15.5 19.8284 15.5 19C15.5 18.1716 16.1716 17.5 17 17.5ZM7.78357 14.5H17.5L19 7.5H6"
                      stroke="#121923"
                      strokeWidth="1.2"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <NavLink to={`/favorites/${id}`}>
            <div className={style.nav_fav}>
              <svg
                className={style.svg}
                width="75px"
                height="75px"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z"
                  stroke="#121923"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
          </NavLink>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Nav;
