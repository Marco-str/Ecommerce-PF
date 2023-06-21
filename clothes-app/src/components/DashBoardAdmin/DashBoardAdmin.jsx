import React from "react";
import { Link } from "react-router-dom";
import style from "../DashBoardAdmin/DashBoardAdmin.module.css";
import { FaArrowLeft } from "react-icons/fa";

const Admin = () => {
  return (
    <div className={style.container}>
     
      <div className={style.containerDashboard}>
        <h1 className={style.dashboard}>Dashboard Admin</h1>
      </div>
      <div className={style.buton_container}>
        <Link to="/CreatePost" className={style.link}>
          Create Product
          <svg
            className={style.svgDash}
            width="30px"
            height="30px"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 6L19 8M14 5.5H5.5V19.5H19.5V11M9 16L9.5 13.5L19 4L21 6L11.5 15.5L9 16Z"
              stroke="#121923"
              stroke-width="1.2"
            />
          </svg>
        </Link>
      </div>
      <div className={style.buton_container}>
        <Link to="/Delete" className={style.link}>
          Manage products
          <svg
            className={style.svgDash}
            width="30px"
            height="30px"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5 5V7.5M6.5 7.5C5.39543 7.5 4.5 8.39543 4.5 9.5C4.5 10.6046 5.39543 11.5 6.5 11.5M6.5 7.5C7.60457 7.5 8.5 8.39543 8.5 9.5C8.5 10.6046 7.60457 11.5 6.5 11.5M6.5 11.5V20M12.5 5V13.5M12.5 13.5C11.3954 13.5 10.5 14.3954 10.5 15.5C10.5 16.6046 11.3954 17.5 12.5 17.5M12.5 13.5C13.6046 13.5 14.5 14.3954 14.5 15.5C14.5 16.6046 13.6046 17.5 12.5 17.5M12.5 17.5V20M18.5 5V7.5M18.5 7.5C17.3954 7.5 16.5 8.39543 16.5 9.5C16.5 10.6046 17.3954 11.5 18.5 11.5M18.5 7.5C19.6046 7.5 20.5 8.39543 20.5 9.5C20.5 10.6046 19.6046 11.5 18.5 11.5M18.5 11.5V20"
              stroke="#121923"
              stroke-width="1.2"
            />
          </svg>
        </Link>
      </div>
      <div className={style.buton_container}>
        <Link to="/Order" className={style.link}>
          Manage users
          <svg
            className={style.svgDash}
            width="30px"
            height="30px"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 18.5H21.5C21.5 15 20.8416 14.1708 19.5 13.5C18.5 13 16.5 12.5 16.5 11C16.5 9.5 17.5 9 17.5 7C17.5 5 16.5 4 15 4C13.6628 4 12.723 4.79472 12.5347 6.38415M4.5 20.5C4.5 17 5.5 16 6.5 15.5C7.5 15 9.5 14.5 9.5 13C9.5 11.5 8.5 11 8.5 9C8.5 7 9.5 6 11 6C12.5 6 13.5 7 13.5 9C13.5 11 12.5 11.5 12.5 13C12.5 14.5 14.5 15 15.5 15.5C16.8416 16.1708 17.5 17 17.5 20.5H4.5Z"
              stroke="#121923"
              stroke-width="1.2"
            />
          </svg>
        </Link>
      </div>
      <div className={style.buton_container}>
        <Link to="/Stock" className={style.link}>
          Manage stock
          <svg
            className={style.svgDash}
            width="30px"
            height="30px"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 13V22M12.5 13L4.5 8M12.5 13L20.5 8M8.5 5.5L16.5 10.5M4.5 8L12.5 3L20.5 8V17L12.5 22L4.5 17V8Z"
              stroke="#121923"
              stroke-width="1.2"
            />
          </svg>
        </Link>
      </div>
      <div className={style.buton_container}>
        <Link to="/OrderList" className={style.link}>
          Purchase history
          <svg
            className={style.svgDash}
            width="30px"
            height="30px"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.50001 5.5C8.50003 5.5 8.50003 8 8.50003 8V9.5M6.50001 5.5C4.5 5.5 4.5 8 4.5 8L4.50001 9.5H8.50003M6.50001 5.5C6.50001 5.5 15.8333 5.5 17.6667 5.5C19.5 5.5 19.5 8.5 19.5 8.5V20L17.6667 19L15.8333 20L14 19L12.1667 20L10.3334 19L8.50003 20V9.5M11 12.5H15M11 9.5H16M11 15.5H16"
              stroke="#121923"
              stroke-width="1.2"
            />
          </svg>
        </Link>
      </div>
      <div className={style.buton_container}>
        <Link to="/home">
          <button className={style.button}>
            Back <FaArrowLeft className={style.icon}></FaArrowLeft>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
