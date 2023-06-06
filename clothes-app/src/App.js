import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
// import Carrito from "./components/Carrito/Carrito";
import CreatePost from "./components/CreatePost/CreatePost";
import DashBoard from "./components/DashBoard/DashBoard";
import Detail from "./components/Detail/Detail";
import Login  from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
//lo de abajo comentado es una manera de no tener que poner "https://localhost:3001" todo el tiempo en las actions

// import axios from "axios";

//  axios.defaults.baseURL = "https://localhost:3001";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/post" element={<CreatePost />} />
        {/* <Route path='/carrito' element={<Carrito/>}/> */}
        <Route path="/dash" element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
