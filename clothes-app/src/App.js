import "./App.css";
import { Route, Routes,} from "react-router-dom";
import Home from "./components/Home/Home";
import CreatePost from "./components/CreatePost/CreatePost";
import DashBoard from "./components/DashBoard/DashBoard";
import Detail from "./components/Detail/Detail";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import LandingPage from "./components/LandingPage/LandingPage"; // Importa la componente LandingPage

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Ruta para la LandingPage */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;