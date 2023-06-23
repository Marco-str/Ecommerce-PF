import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { idUser } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import {
  consultaSiIniciado,
  loginWithGoogle,
} from "../../redux/actions/actions";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import Swal from "sweetalert2";

import axios from "axios";

const Login = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB5fkHI-K8lcyC8U8TSDfnjkqFjMZ6mmTQ",
    authDomain: "clothestore-8ead6.firebaseapp.com",
    projectId: "clothestore-8ead6",
    storageBucket: "clothestore-8ead6.appspot.com",
    messagingSenderId: "86387538325",
    appId: "1:86387538325:web:9e422e0928cf885f689e9c",
    measurementId: "G-JSSCSKPYD9",
  };
  initializeApp(firebaseConfig);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const inicio = () => {
    dispatch(consultaSiIniciado("si"));            dispatch(loginWithGoogle("no"))

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setError("Please enter your username and password");
      return;
    }

    try {
      const response = await axios.post("/users/login", {
        userName,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        const userId = data.user.id;

        dispatch(loginWithGoogle("no"));
        dispatch(idUser(userId));

        setUserName("");
        setPassword("");
        setError("");
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("❌Invalid Username or Password❌");
    }
  };

  const provider = new GoogleAuthProvider();

  const auth = getAuth();

  function callLoginGoogle() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        try {
          const response = await axios.post("/users/login", {
            userName: user.displayName,
            password: user.accessToken,
          });

          if (response.status === 200) {
            const data = response.data;
            dispatch(idUser(data.user.id));
            dispatch(consultaSiIniciado("si"));
            dispatch(loginWithGoogle("si"));
            navigate("/home");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Your account hasn't been registered yet!",
              footer:
                '<a href="/signup">Do you want to register on this Webpage?</a>',
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your account hasn't been registered yet!",
            footer:
              '<a href="/signup">Do you want to register on this Webpage?</a>',
          });
        }
      })
      .catch((error) => {
        // Manejar el error aquí si es necesario
      });
  }

  return (
    <section className={styles.back}>
      <div className={styles.body}>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div className={styles.nav}>
            <h1>Login</h1>
          </div>

          <div className={styles.statsAndTypes}>
            <div className={styles.stats}>
              <div className={styles.centralize}>
                <div className={styles.inputBlock}>
                  <input
                    type="text"
                    name="username"
                    id="input-username"
                    required
                    value={userName}
                    onChange={handleUserNameChange}
                  />
                  <span className={styles.placeholder}>Username</span>
                </div>
              </div>

              <div className={styles.centralize}>
                <div className={styles.inputBlock}>
                  <input
                    type="password"
                    name="password"
                    id="input-password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <span className={styles.placeholder}>Password</span>
                </div>
              </div>

              {error && <p className={styles.error}>{error}</p>}
            </div>
            <div className={styles.loginGoogle}>
              <Link className={styles.googleSil} onClick={callLoginGoogle}>
                <svg
                  className={styles.svgGoogle}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="80px"
                  height="80px"
                >
                  <path
                    fill="#fbc02d"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#e53935"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4caf50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1565c0"
                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                <p className={styles.textGoogle}>Login with Google</p>
              </Link>
            </div>

            <div className={styles.buttons}>
              <div className={styles.types}>
                <button
                  onClick={inicio}
                  type="submit"
                  className={styles.button}
                >
                  Login
                </button>
              </div>

              <div className={styles.containerGoogleBack}>
                <div className={styles.types}>
                  <Link to="/">
                    <button className={styles.button}>Back</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
