
import './App.css';
import Navbar from './components/Header/Navbar';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from './components/Login/Login';

function App() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/Login" element={<Login/>} />
        

      </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
