import React, { useState } from "react";
import Filters from "../Filters/Filters";
import style from "./ButonFilter.module.css";
import arriba from "../../img/arriba.png";
import abajo from "../../img/abajo.png";

const Buttons = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [price, setPrice] = useState("");


  const handleButtonClick = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className={style.container}>
      <button className={style.button} onClick={handleButtonClick}>
        {showFilters ? (
          <div>
            <p>Hide Filters</p>
            <img className={style.flecha} src={arriba} alt="arriba" />
          </div>
        ) : (
          <div>
            <p>Show Filters</p>
            <img  className={style.flecha} src={abajo} alt="arriba"/>
          </div>
        )}
      </button>
      {showFilters && <Filters setprice={setPrice} />}
    </div>
  );
};

export default Buttons;
