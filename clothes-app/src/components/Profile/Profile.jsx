import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Profile.module.css";
import { getUserAll, getUserById } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  const [url, setUrl] = useState("");
  const id = useSelector((state) => state.idUsuario);

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
    <>
      <div className={styles.main_container}>
        <div className={styles.main_container2}>
          <div className={styles.data_container}>
            <h2 className={styles.title}>Profile</h2>

            <p className={styles.info}>Name: </p>
            <h1 className={styles.h_container}>{name}</h1>
            <p className={styles.info}>Username: </p>
            <h1 className={styles.h_container}>{userId.userName}</h1>
            <p className={styles.info}>Email: </p>
            <h2 className={styles.h_container2}>{email}</h2>
            <p className={styles.info}>Phone: </p>
            <h2 className={styles.h_container2}>{phone}</h2>

            <img
              className={styles.img_profile}
              src={url}
              alt={name}
            />
          </div>

          {/* /***************************************************************************** * */}

          <div className={styles.buttons_containers}>
            <div>
              <Link to={`/ListUser/${idUser}`} className={styles.purchaseLink}>
                <button className={styles.button_data}>
                  {" "}
                  Purchase History{" "}
                </button>
              </Link>
            </div>

            <div>
              <Link to={`/editProfile`} className={styles.purchaseLink}>
                <button className={styles.button_data}>Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.button_back}>
          <Link to="/home">
            <button className={styles.button}>
              {" "}
              Back <FaArrowLeft className={styles.icon}></FaArrowLeft>{" "}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
