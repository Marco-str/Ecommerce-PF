import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Publicate from './components/Publicate/Publicate';
import Detail from './components/Detail/Detail';
import DashboardAdmin from './components/DashboardAdmin/DashboardAdmin';
import SignUp from './components/Sign/SignUp';
import Carrito from './components/Carrito/Carrito';
import Pay from './components/Pay/Pay';

function App() {
  return (
    <div className="App">
 <Routes>
      <Route exact path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/carrito' element={<Carrito/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/publicate' element={<Publicate/>}/>
      <Route path='/dashboard' element={<DashboardAdmin/>}/>
      <Route path='/pay' element={<Pay/>}/>


    </Routes>

    </div>
  );
}

export default App;
