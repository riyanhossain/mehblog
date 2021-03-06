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
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Footer from "./components/Footer/Footer";
import Myblogs from "./components/MyBlogs/Myblogs";
import Dashboard from "./components/Dashboard/Dashboard";
import DashArticle from "./components/Dashboard/DashArticle";

export const UserContext = createContext();
function App() {
  const userLocal = JSON.parse(localStorage.getItem("user")) || {};
  const [user, setUser] = useState(userLocal);
  const [dtoggle, setDtoggle] = useState(true);
  return (
    <UserContext.Provider value={[user, setUser, dtoggle, setDtoggle]}>
      {dtoggle ? (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/article/:id" element={<Article />} />

            <Route path="/tech" element={<Tech />} />
            <Route path="/programming" element={<Programming />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/machinelearning" element={<Machinelearning />} />
            <Route path="/blockchain" element={<Blockchain />} />
            <Route path="/*" element={<PrivateRoute />}>
              <Route path="createblog" element={<Createblog />} />
              <Route path="myblogs" element={<Myblogs />} />
              {/* <Route path="dashboard" element={<Dashboard/>} /> */}
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/article/:id" element={<DashArticle />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </UserContext.Provider>
  );
}

export default App;
