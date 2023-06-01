import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {
  const products = useSelector((state) => state.products);
  console.log(products, "esto es produ");
  return (
    <div className={style.container}>
      {products.CatalogProducts?.map((product) => {
        console.log(product.Variants.ProductImages, "imagenes");
        return (
          <>
            <div >
              <Card
                key={product.id}
                name={product.DisplayName}
                image={product.Variants.map((e) => {
                  return e.ProductImages;
                })}
              />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default CardsContainer;
