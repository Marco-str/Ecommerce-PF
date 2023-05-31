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

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
