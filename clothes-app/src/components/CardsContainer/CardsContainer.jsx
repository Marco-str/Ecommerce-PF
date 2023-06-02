import { useSelector } from "react-redux";
import { useState } from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {
  const products = useSelector((state) => state.products);

  //Paginado
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 9;
  const filterProducts = products.slice(
    currentPage,
    currentPage + productsPerPage
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    document.documentElement.scrollTop = 100;
    setCurrentPage(currentPage + 9);
  };
  const prevPage = () => {
    document.documentElement.scrollTop = 100;
    if (currentPage > 0) setCurrentPage(currentPage - 9);
  };

  return (
    <div>
      <div className={style.container}>
        {filterProducts?.map((product) => {
          return (
            <>
              <div>
                <Card
                  key={product.id}
                  name={product.name}
                  image={product.image}
                />
              </div>
            </>
          );
        })}
      </div>
      <div>
        <div className="clicks">
          <button className="button" onClick={prevPage}>
            Anterior
          </button>
          <button className="button" onClick={nextPage}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardsContainer;
