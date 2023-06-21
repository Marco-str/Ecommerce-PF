import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProducts, getUserById } from "../../redux/actions/actions";
import Buttons from "../ButonFilter/ButonFilter";
import CardsContainer from "../CardsContainer/CardsContainer";
import Nav from "../Nav/Nav";
import WhatsApp from "../WhatsApp/WhatsApp";
import Footer from "../Footer/Footer";
import style from "./Home.module.css";
import loadingGif from "../../assets/loading.gif";

const Home = () => {
  const { id, idBan } = useSelector((state) => ({
    id: state.idUsuario,
    idBan: state.userId,
  }));

  const [loading, setLoading] = useState(true); // Estado de carga

  if (id.length !== 0) localStorage.setItem("ids", id);

  const idUser = localStorage.getItem("ids");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserById(idUser));
        await dispatch(getAllProducts());
        setLoading(false); // Finaliza la carga una vez que se obtienen los datos
      } catch (error) {
        // Manejar errores en la obtención de datos
        console.error("Error al obtener datos:", error);
        setLoading(false); // Finaliza la carga en caso de error
      }
    };

    fetchData();
  }, [dispatch, idUser]);

  return (
    <section>
      {loading ? ( // Muestra un mensaje de carga mientras se obtienen los datos
        <div className={style.loadingContainer}>
          <img className={style.loading} src={loadingGif} alt="loading" />
        </div>
      ) : (
        <>
          {idBan.active === true || idBan.length === 0 ? (
            <div className={style.container2}>
              <Nav />
              <Buttons />
              <CardsContainer />
              <div className={style.wppContainer}>
                <WhatsApp />
              </div>
              <Footer />
            </div>
          ) : (
            <div>
              <div className={style.container}>
                <h1 className={style.bannedMessage}>
                  You are banned from this site.
                </h1>
                <svg
                  width="400px"
                  height="400px"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 15.5L12.5 12.5M12.5 12.5L15.5 9.5M12.5 12.5L9.5 9.5M12.5 12.5L15.5 15.5M20.5 12.5C20.5 16.9183 16.9183 20.5 12.5 20.5C8.08172 20.5 4.5 16.9183 4.5 12.5C4.5 8.08172 8.08172 4.5 12.5 4.5C16.9183 4.5 20.5 8.08172 20.5 12.5Z"
                    stroke="#121923"
                    stroke-width="1.2"
                  />
                </svg>
              </div>
              <div className={style.containerP}>
                <h4 className={style.pp}>
                  If you believe we have made a mistake, you can contact our
                  technical support at  0800-321-0611.
                </h4>
                <p className={style.pp2}>All admission rights reserved. ©</p>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Home;
