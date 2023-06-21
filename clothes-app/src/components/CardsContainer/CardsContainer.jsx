import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Paginado } from "../Paginado/Paginado";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { setFavorites } from "../../redux/actions/actions";
import axios from "axios";

const CardsContainer = () => {
  const iniciado = useSelector((state) => state.iniciado);
  const userId = useSelector((state) => state.userId);
  const id = userId.id;

  const dispatch = useDispatch();

  if (iniciado?.length !== 0) localStorage.setItem("sesions", iniciado);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(`/whishListProduct/${id}`);
        dispatch(setFavorites(response.data.Clothes));
      } catch (error) {
        console.error("Error al obtener los productos favoritos", error);
      }
    };
    fetchFavoriteProducts();
  }, [dispatch, id]);

  const { products } = useSelector((state) => {
    return {
      products: state.products,
    };
  });

  const [pagina, setPagina] = useState(1);
  const porPagina = 6;

  // Move the declaration of filteredProducts here
  const filteredProducts = products.filter(
    (product) => product.isAvaible !== false 
  );

  const maximo = Math.ceil(filteredProducts.length / porPagina);
  return (
    <div>
      <div className={style.container}>
        {filteredProducts
          .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
          .map((product) => (
            <Card
              name={product.name}
              image={product.image}
              price={product.price}
              id={product.id}
              stock={product.stock}
              key={product.id}
            />
          ))}
      </div>
      <div>
        <Paginado pagina={pagina} setPagina={setPagina} maximo={maximo} />
      </div>
    </div>
  );
};

export default CardsContainer;
