import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Profile.module.css";
import { getUserAll, getUserById } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import Nav from "../Nav/Nav";

const Profile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const google = useSelector((state) => state.google);

  const [url, setUrl] = useState("");
  const id = useSelector((state) => state.idUsuario);

  if (google.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("google", google);
  }
  //const profileImages = userId.profileImage;

  const googles = localStorage.getItem("google");

  console.log(googles);

  if (id.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("ids", id);
  }
  //const profileImages = userId.profileImage;

  const idUser = localStorage.getItem("ids");

  useEffect(() => {
    setUrl(userId.profileImage);
  }, [userId.profileImage]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getUserAll());
      dispatch(getUserById(idUser));
    };

    fetchData();
  }, [dispatch, idUser]);

  const { name, email, phone } = userId;

  return (
    <div className={styles.main_container}>
      <Nav />
      <div className={styles.button_back}>
        <Link to="/home">
          <button className={styles.button}>
            Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
          </button>
        </Link>
      </div>

      <div className={styles.main_container2}>
        <div className={styles.data_container}>
          <h1 className={styles.title}>
            <svg
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
          </h1>

          <div className={styles.containerInfosss}>
            <p className={styles.info}>Name </p>
            <div className={styles.centerh2}>
              <h1 className={styles.h_container}>{name}</h1>
            </div>
          </div>

          <div className={styles.containerInfosss}>
            <p className={styles.info}>Username </p>
            <div className={styles.centerh2}>
              <h1 className={styles.h_container}>{userId.userName}</h1>
            </div>
          </div>

          <div className={styles.containerInfosss}>
            <p className={styles.info}>Email </p>
            <div className={styles.centerh2}>
              <h2 className={styles.h_container}>{email}</h2>
            </div>
          </div>

          <div className={styles.containerInfosss}>
            <p className={styles.info}>Phone </p>
            <div className={styles.centerh2}>
              <h2 className={styles.h_container}>{phone}</h2>
            </div>
          </div>

          <img className={styles.img_profile} src={url} alt={name} />
        </div>

        {/* /***************************************************************************** * */}

        <div className={styles.buttons_containers}>
          <div>
            <Link to={`/ListUser/${idUser}`} className={styles.purchaseLink}>
              <button className={styles.button_data}>Purchase History</button>
            </Link>
          </div>

          {googles === "no" ? (
            <div>
              <Link to={`/editProfile`} className={styles.purchaseLink}>
                <button className={styles.button_data}>Edit Profile</button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
