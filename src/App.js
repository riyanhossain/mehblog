import "./App.css";
import Navbar from "./components/Header/Navbar";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import { createContext, useState } from "react";
import Home from "./components/Home/Home";

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState([]);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <main className="flex flex-col justify-center items-center">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </main>
    </UserContext.Provider>
  );
}

export default App;
