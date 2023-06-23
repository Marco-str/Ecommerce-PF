import React, { useState, useEffect } from "react";
import style from "./Paginado.module.css";

export const Paginado = ({ pagina, setPagina, maximo }) => {
  const [input, setInput] = useState(pagina);

  useEffect(() => {
    if (pagina < 1) {
      setPagina(1);
      setInput(1);
    } else if (pagina > Math.ceil(maximo)) {
      setPagina(Math.ceil(maximo));
      setInput(Math.ceil(maximo));
    }
  }, [maximo, pagina, setPagina]);

  const nextPage = () => {
    const nextPage = pagina + 1;
    if (nextPage <= Math.ceil(maximo)) {
      setPagina(nextPage);
      setInput(nextPage);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Desplazamiento al principio de la página
    }
  };

  const previousPage = () => {
    const previousPage = pagina - 1;
    if (previousPage >= 1) {
      setPagina(previousPage);
      setInput(previousPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      const newPage = parseInt(e.target.value);
      if (newPage < 1 || newPage > Math.ceil(maximo)) {
        setPagina(1);
        setInput(1);
      } else {
        setPagina(newPage);
        setInput(newPage);
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (pagina < 1) {
      setPagina(1);
      setInput(1);
    } else if (pagina > Math.ceil(maximo)) {
      setPagina(Math.ceil(maximo));
      setInput(Math.ceil(maximo));
    }
  }, [maximo, pagina, setPagina]);

  return (
    <div className={style.container}>
      <button
        disabled={pagina === 1}
        onClick={previousPage}
        className={style.previousPage}
      >
        <svg
          width="20"
          height="38"
          viewBox="0 0 29 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.2647 37.1508C26.9674 37.3056 26.6335 37.3764 26.299 37.3557C25.9645 37.3349 25.6419 37.2234 25.3659 37.0329L1.46987 20.4725C1.22573 20.3031 1.02625 20.077 0.888392 19.8136C0.750535 19.5503 0.678574 19.2573 0.678574 18.9599C0.678574 18.6625 0.750535 18.3697 0.888392 18.1062C1.02625 17.8428 1.22573 17.6167 1.46987 17.4474L25.3659 0.886865C25.6417 0.695873 25.9645 0.583954 26.2992 0.563392C26.6339 0.54283 26.9678 0.614315 27.2649 0.770117C27.562 0.925919 27.8108 1.15997 27.9844 1.44728C28.1581 1.73446 28.2499 2.06373 28.25 2.39934V35.5204C28.25 35.8563 28.1583 36.1859 27.9846 36.4732C27.8109 36.7607 27.562 36.9948 27.2647 37.1508Z"
            fill="white"
          />
        </svg>
      </button>
      <input
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        className={style.input}
        name="page"
        value={input}
        autoComplete="off"
      />
      <p className={style.p}> de {Math.ceil(maximo)}</p>
      <button
        disabled={pagina === Math.ceil(maximo)}
        onClick={nextPage}
        className={style.nextPage}
      >
        <svg
          width="20"
          height="38"
          viewBox="0 0 29 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.73567 37.1508C2.03207 37.3056 2.36706 37.3764 2.70067 37.3557C3.03566 37.3349 3.35825 37.2234 3.63397 37.0329L27.5301 20.4725C27.7741 20.3031 27.974 20.077 28.1119 19.8136C28.2497 19.5503 28.3214 19.2573 28.3214 18.9599C28.3214 18.6625 28.2497 18.3697 28.1119 18.1062C27.974 17.8428 27.7741 17.6167 27.5301 17.4474L3.63397 0.886865C3.35825 0.695873 3.03566 0.583954 2.70067 0.563392C2.36568 0.54283 2.03207 0.614315 1.73567 0.770117C1.4379 0.925919 1.18976 1.15997 1.01605 1.44728C0.842355 1.73446 0.75 2.06373 0.75 2.39935V35.5204C0.75 35.8563 0.842355 36.1859 1.01605 36.4732C1.18976 36.7607 1.4379 36.9948 1.73567 37.1508Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};
