import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../redux/actions/actions";
import CardsContainer from "../CardsContainer/CardsContainer";
import Nav from "../Nav/Nav";
import Filter from "../Filters/Filters";

import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <Nav />
      <Filter />
      <CardsContainer />
    </div>
  );
};

export default Home;
