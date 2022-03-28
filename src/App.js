import "./App.css";
import Navbar from "./components/Header/Navbar";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import { createContext, useState } from "react";

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState([]);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="flex flex-col justify-center items-center">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
