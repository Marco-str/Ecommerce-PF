import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../redux/actions/actions";
import CardsContainer from "../CardsContainer/CardsContainer";
import Filter from "../Filter/Filter";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <Filter />
      <CardsContainer />
    </div>
  );
};

export default Home;