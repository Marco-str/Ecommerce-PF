import React, { useState } from "react";
import Filters from "../Filters/Filters";
import style from "./ButonFilter.module.css";

const Buttons = () => {
  const [showFilters, setShowFilters] = useState(false);
  // eslint-disable-next-line
  const [price, setPrice] = useState("");
  const handleButtonClick = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className={style.container}>
      <button className={style.button} onClick={handleButtonClick}>
        {showFilters ? (
          <div>
            <div className={style.containerAA}>
              <h4 className={style.hidentext}>Hide Filters</h4>
            </div>
            <img
              className={style.flecha}
              src={
                "https://res.cloudinary.com/finalproject123/image/upload/v1686937933/arriba_nu4ccg.png"
              }
              alt="arriba"
            />
          </div>
        ) : (
          <div>
            <h4 className={style.hidentext}>Show Filters</h4>
            <img
              className={style.flecha}
              src={
                "https://res.cloudinary.com/finalproject123/image/upload/v1686937918/abajo_o2u4a8.png"
              }
              alt="arriba"
            />
          </div>
        )}
      </button>
      {showFilters && <Filters setprice={setPrice} />}
    </div>
  );
};

export default Buttons;
