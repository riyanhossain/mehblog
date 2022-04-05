import "./App.css";
import Navbar from "./components/Header/Navbar";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import { createContext, useState } from "react";
import Home from "./components/Home/Home";
import Article from "./components/Home/Article";
import Createblog from "./components/CreateBlog/Createblog";
import Tech from "./components/Categories/Tech";
import Programming from "./components/Categories/Programming";
import AI from "./components/Categories/AI";
import Machinelearning from "./components/Categories/Machinelearning";
import Blockchain from "./components/Categories/Blockchain";
import Myblogs from "./components/Header/MyBlogs/Myblogs";

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState([]);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="flex flex-col justify-center items-center">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Login" element={<Login />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/createblog" element={<Createblog />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/programming" element={<Programming/>} />
            <Route path="/ai" element={<AI />} />
            <Route path="/machinelearning" element={<Machinelearning />} />
            <Route path="/blockchain" element={<Blockchain />} />
            <Route path="/myblogs" element={<Myblogs/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
