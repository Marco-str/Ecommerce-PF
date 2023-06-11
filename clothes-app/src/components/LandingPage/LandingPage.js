import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={s.divLP}>
      <h1 className={s.title}>THRIFT SHOP</h1>
      <div className={s.divTextBtn}>
        <h1 className={s.text}>should be better</h1>
        <div className={s.btnContainer}>
          <Link className={`${s.btn} ${s.loginBtn}`} to="/login">Log In</Link>
          <Link className={`${s.btn} ${s.signupBtn}`} to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}