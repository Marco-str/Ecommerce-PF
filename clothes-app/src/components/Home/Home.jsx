import { useDispatch } from "react-redux";
import { useEffect , useCallback} from "react";
import { getAllProducts } from "../../redux/actions/actions";
import CardsContainer from "../CardsContainer/CardsContainer";
import style from "./Home.module.css";
import SearchBar from "../SearchBar/SearchBar";

const Home = () => {
  const dispatch = useDispatch();
  const dispatchGetAllProducts = useCallback(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  
  useEffect(() => {
    dispatchGetAllProducts();
  }, [dispatchGetAllProducts]);
  


  return (
    <div>
      <SearchBar/>
    <div className={style.container}>

      <CardsContainer />
      </div>
    </div>
  );
};

export default Home;
