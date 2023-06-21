import React, { useState } from "react";
//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import checks from "../../assets/check.png";
import Swal from "sweetalert2";

const SignUp = () => {
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
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
    profileImage: "",
  });

  const [googleUser, setGoogleUser] = useState({
    name: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
    profileImage: "",
  });

  const [google, setGoogle] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({
    name: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setGoogle(false);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateUser(user);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post("/users/signup", user).then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your count have beeen registered succesfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/login");
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The UserName or Email is already register...",
          footer: '<a href="/login">You have account?</a>',
        });
      }
    }
  };

  /***************************************************************************************************** */

  const validateUser = (user) => {
    const errors = {};
    // ----------------------------------------------------------------
    if (!user.name) {
      errors.name = "Name is required";
    } else if (!user.name.trim()) {
      errors.name = "Name is required";
    } else if (user.name.length < 3 || user.name.length > 20) {
      errors.name = "Name should be at least 3 at 20 characters long";
    } else if (!validateName(user.name)) {
      errors.name = "Name should not contain special characters";
    }
    // -------------------------------------------------------------
    if (!user.userName.trim()) {
      errors.userName = "Username is required";
    }
    // -------------------------------------------------------------
    if (!user.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (isNaN(user.phone)) {
      errors.phone = "Phone should be a number";
    } else if (user.phone.length < 8 || user.phone.length > 12) {
      errors.phone = "Phone should be at least 8 at 12 characters long";
    }
    // -------------------------------------------------------------
    if (!user.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(user.email)) {
      errors.email = "Invalid email format";
    }
    // -------------------------------------------------------------
    if (!user.password.trim()) {
      errors.password = "Password is required";
    } else if (user.password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }
    // else if(!isValidPassword(user.password)) {
    //   errors.password =
    //     "Password should contain at least one uppercase letter, one lowercase letter and one number";
    // }

    return errors;
  };
  useEffect(() => {
    setErrors(validateUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // --------------------------------------------------------------------------------------------------------------
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //  const isValidPassword = (password) => {
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@/$%#?])[a-zA-Z\d@/$%#?]{8,}$/;
  //   return passwordRegex.test(password);
  // };

  const validateName = (name) => {
    const nameRegex = /^(?=.{3,25}$)[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(name);
  };

  /****************************************************** */
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /***************************************************************************************************** */

  const provider = new GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  const auth = getAuth();

  async function callLoginGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const users = result.user;
      setGoogleUser({
        name: users.displayName,
        userName: users.displayName,
        phone: "12212",
        email: users.email,
        password: users.accessToken,
        profileImage: users.photoURL,
      });
      setGoogle(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  }

  useEffect(() => {
    if (google) {
      try {
        axios
          .post("/users/signup", googleUser)

          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your count have been registered succesfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/login");
          })
          .catch((res) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Al parecer tu cuenta ya se encuentra registrada...",
              footer: '<a href="">Why do I have this issue?</a>',
            });
          });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, user, google]);

  return (
    <section className={styles.back}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* /******************************************************************************************************** * */}

          <div>
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>

            <div className={styles.inputBlock}>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>

            {errors.name ? (
              <div className={styles.containerError}>
                <span className={styles.error}>
                  <span>{errors.name}</span>
                </span>
              </div>
            ) : (
              <div className={styles.containerCheck}>
                <img className={styles.check} src={checks} alt="check" />
              </div>
            )}
          </div>

          {/* /******************************************************************************************************** * */}

          <div>
            <label htmlFor="userName" className={styles.label}>
              Username:
            </label>
            <div className={styles.inputBlock}>
              <input
                type="text"
                id="userName"
                name="userName"
                value={user.userName}
                onChange={handleChange}
                required
              />
            </div>

            {errors.userName ? (
              <div className={styles.containerError}>
                <span className={styles.error}>{errors.userName}</span>
              </div>
            ) : (
              <div className={styles.containerCheck}>
                <img className={styles.check} src={checks} alt="check" />
              </div>
            )}
          </div>

          {/* /* ******************************************************************************************************** * * * */}
          <div>
            <label htmlFor="phone" className={styles.label}>
              Phone:
            </label>
            <div className={styles.inputBlock}>
              <input
                type="text"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                required
              />
            </div>

            {errors.phone ? (
              <div className={styles.containerError}>
                <span className={styles.error}>{errors.phone}</span>
              </div>
            ) : (
              <div className={styles.containerCheck}>
                <img className={styles.check} src={checks} alt="check" />
              </div>
            )}
          </div>

          {/* /* ******************************************************************************************************** * * */}

          <div>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <div className={styles.inputBlock}>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            {errors.email ? (
              <div className={styles.containerError}>
                <span className={styles.error}>{errors.email}</span>
              </div>
            ) : (
              <div className={styles.containerCheck}>
                <img className={styles.check} src={checks} alt="check" />
              </div>
            )}
          </div>

          {/* /* /* ******************************************************************************************************** * *       */}
          <div>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>

            <div className={styles.inputBlockPassword}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className={styles.buttonHidden}
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.20513 12.5C6.66296 14.7936 8.9567 16.9 12.5 16.9C16.0433 16.9 18.3371 14.7936 19.7949 12.5C18.3371 10.2064 16.0433 8.1 12.5 8.1C8.9567 8.1 6.66296 10.2064 5.20513 12.5ZM3.98551 12.1913C5.53974 9.60093 8.20179 6.9 12.5 6.9C16.7982 6.9 19.4603 9.60093 21.0145 12.1913L21.1997 12.5L21.0145 12.8087C19.4603 15.3991 16.7982 18.1 12.5 18.1C8.20179 18.1 5.53974 15.3991 3.98551 12.8087L3.80029 12.5L3.98551 12.1913ZM12.5 9.4C10.7879 9.4 9.4 10.7879 9.4 12.5C9.4 14.2121 10.7879 15.6 12.5 15.6C14.2121 15.6 15.6 14.2121 15.6 12.5C15.6 10.7879 14.2121 9.4 12.5 9.4Z"
                      fill="#121923"
                    />
                  </svg>
                ) : (
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 15.5L5.5 17.5M20.5 12.5C19.8612 13.5647 19.041 14.6294 18.0008 15.501M18.0008 15.501C16.5985 16.676 14.7965 17.5 12.5 17.5M18.0008 15.501L18 15.5M18.0008 15.501L19.5 17.5M12.5 17.5C8.5 17.5 6 15 4.5 12.5M12.5 17.5V20M15.5 17L16.5 19.5M9.5 17L8.5 19.5"
                      stroke="#121923"
                      stroke-width="1.2"
                    />
                  </svg>
                )}
              </button>
            </div>

            {errors.password ? (
              <div className={styles.containerError}>
                <span className={styles.error}>{errors.password}</span>
              </div>
            ) : (
              <div className={styles.containerCheck}>
                <img className={styles.check} src={checks} alt="check" />
              </div>
            )}
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
              <p className={styles.textGoogle}>
                Sign in with Google
              </p>
            </Link>
          </div>

          {/* /************************************************************************************************************* * *       */}
          <button type="submit" className={styles.button}>
            Sign Up
          </button>

          <Link to="/">
            <button className={styles.button}>Back</button>
          </Link>
        </form>
      </div>

      {/* /************************************************************************************************************* * *       */}
    </section>
  );
};

export default SignUp;
