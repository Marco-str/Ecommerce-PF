import { useSelector } from "react-redux";
import Card from "../Card/Card";

const CardsContainer = () => {
  const products = useSelector((state) => state.products);
  return (
    <div>
      {products.map((products) => {
        return (
          <>
            <div>
            <Card 
              name={products.DisplayName}/>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default CardsContainer;