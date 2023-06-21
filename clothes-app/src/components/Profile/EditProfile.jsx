import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getUserAll, getUserById } from "../../redux/actions/actions";
import UploadFile from "../UploadFile/UploadFile";
import axios from "axios";

import styles from "./EditProfile.module.css";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.idUsuario);
  const idUser = localStorage.getItem("ids");
  const userId = useSelector((state) => state.userId);
  const { name, userName, email, phone, password, profileImage } =
    userId;
  const [url, setUrl] = useState(profileImage);

  useEffect(() => {
    setUrl(userId.profileImage);
  }, [userId.profileImage]);

  if (id.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("ids", id);
  }

  const [form, setForm] = useState({
    id: idUser,
    name,
    userName,
    phone,
    email,
    password,
  });

  const [form2, setForm2] = useState({
    id: idUser,
    name: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [mostrar, setMostrar] = useState({
    mostrars: "",
  });

  const change = (value) => {
    setMostrar((prevMostrar) => ({
      ...prevMostrar,
      [value]: !prevMostrar[value],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getUserAll());
      dispatch(getUserById(idUser));
    };
    fetchData();
  }, [dispatch, idUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setForm2((prevForm2) => ({
      ...prevForm2,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${idUser}`, form);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/profile");
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleUpload = async (error, result) => {
    if (result && result.event === "success") {
      setUrl(result.info.secure_url);
      setForm((prevForm) => ({
        ...prevForm,
        profileImage: result.info.secure_url,
      }));
    }
  };

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.form}>

          <h2 className={styles.form__group}>Profile</h2>
      <div className={styles.div_1}>
          <div>
            {/* <img src={url} alt="profilePicture" className={styles.imagen_profile} /> */}
            <img src={url} alt="profilePicture" className={styles.imagen_profile} />
            <p></p>
          </div>

          <p className={styles.info}>Name:</p>
          <h2>{name}</h2>
          <p className={styles.info}>Username:</p>
          <h2>{userId.userName}</h2>
          <p className={styles.info}>Email:</p>
          <h3>{email}</h3>
          <p className={styles.info}>Phone:</p>
          <h3>{phone}</h3>

      </div>
      </div>

        <div className={styles.form__container}>
          <h1 className={styles.form__title}>Editar Perfil</h1>
        <div className={styles.div_1}>
          <form action="" onSubmit={handleSubmit} className={styles.form}>
            <Link className={styles.linkButton} onClick={() => change("name")}>Name</Link>

            {mostrar.name && (
              <div className={styles.form__group}>
                <label htmlFor="name" className={styles.form__label}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={form2.name}
                  className={styles.form__input}
                />
                <span className={styles.form__line}></span>
              </div>
            )}

            <Link className={styles.linkButton} onClick={() => change("userName")}>User Name</Link>

            {mostrar.userName && (
              <div className={styles.form__group}>
                <label htmlFor="lastName" className={styles.form__label}>
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  id="lastName"
                  onChange={handleChange}
                  value={form2.userName}
                  className={styles.form__input}
                />
                <span className={styles.form__line}></span>
              </div>
            )}

            <Link className={styles.linkButton} onClick={() => change("email")}>Email</Link>

            {mostrar.email && (
              <div className={styles.form__group}>
                <label htmlFor="email" className={styles.form__label}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={form2.email}
                  className={styles.form__input}
                />
                <span className={styles.form__line}></span>
              </div>
            )}

            <Link onClick={() => change("phone")} className={styles.linkButton}>Phone</Link>

            {mostrar.phone && (
              <div className={styles.form__group}>
                <label htmlFor="phone" className={styles.form__label}>
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  onChange={handleChange}
                  value={form2.phone}
                  className={styles.form__input}
                />
                <span className={styles.form__line}></span>
              </div>
            )}

            <Link className={styles.linkButton} onClick={() => change("password")}>Password</Link>

            {mostrar.password && (
              <div className={styles.form__group}>
                <label htmlFor="password" className={styles.form__label}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={form2.password}
                  className={styles.form__input}
                />
                <span className={styles.form__line}></span>
              </div>
            )}

            <UploadFile handleUpload={handleUpload} folder={"user"} />

            <button type="submit" className={styles.button}>
              Save Data
            </button>
          </form>
        </div>
       </div>

      <Link to="/profile">
        <button className={styles.button}>
          Back <FaArrowLeft className={styles.icon} />
        </button>
      </Link>
      </div>
    </>
  );
};

export default EditProfile;
