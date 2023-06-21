import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";
import { useDispatch } from "react-redux";
import { consultaSiIniciado } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSinIniciar = () => {
    dispatch(consultaSiIniciado("no"));
    navigate("/home");
  };

  return (
    <section className={s.back}>
      <div className={s.body}>
        <div className={s.titles}>
          <h1 className={s.title}>THRIFT SHOP</h1>
          <h1 className={s.text}>should be better</h1>
        </div>

        <div className={s.divTextBtn}>
          <div className={s.btnContainer}>
            <Link className={s.btnS} to="/login">
              <button className={s.btn}>Log in</button>
            </Link>
            <Link className={s.btnS} to="/signup">
              <button className={s.btn}>Sign In</button>
            </Link>
            <button onClick={handleSinIniciar} className={s.btn}>
            Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
