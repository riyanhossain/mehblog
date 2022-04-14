import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebase.config";
import { getAuth, signOut } from "firebase/auth";

function Navbar() {
  const app = initializeApp(firebaseConfig);
  let navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  const handleSignOut = () => {

    console.log(user)
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser({ signIn: false });
        localStorage.setItem("user", JSON.stringify({ signIn: false }));

        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  // const userLocal = JSON.parse(localStorage.getItem("user")) || {};

  const profileImage = user.photoURL
  // ? user.photoURL : userLocal.photoURL;
  const [active, setActive] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const routeChange = (route) => {
    navigate(route);
  };
  console.log(user)
  return (
    <header>
      <nav className="bg-[#AAD1A6]  flex flex-col items-center w-screen">
        <div className="p-5 flex justify-between  items-center w-4/5 lg:w-[1292px]">
          <div className="ml-4 flex">
            <p className="text-2xl font-semibold text-white">
              <Link to="/">MehBlog</Link>
            </p>

            {/* <input
              className="ml-1 md:ml-6  border-2 border-gray-300 bg-white h-10 px-5 pr-0 md:pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            /> */}
          </div>
          <div className="mr-4">
            {user.signIn? (
              <div className="flex justify-center">
                <div className="flex justify-center items-center">
                  <button
                    className="hidden p-2 bg-yellow-500 rounded border-0 pl-2 pr-2 mr-2 text-white lg:inline-flex"
                    onClick={() => navigate("/createblog")}
                  >
                    Create Blog
                  </button>
                  {
                    user.role === 'admin' && 
                      <button
                      className="hidden p-2 bg-yellow-500 rounded border-0 pl-2 pr-2 mr-2 text-white lg:inline-flex"
                      onClick={() => navigate("/dashboard")}
                      >
                      Dashboard
                    </button>
                    
                  }

                  <Button
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className=""
                  >
                    <img
                      src={profileImage}
                      alt=""
                      className="w-12 h-12 border-2 rounded-full border-yellow-400 "
                    />
                  </Button>
                  <p className="text-white hidden lg:inline-flex">
                    {user.displayName
                      // ? user.displayName
                        // : userLocal.displayName
                    }
                  </p>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        routeChange("/");
                      }}
                    >
                      Home
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        routeChange("/myblogs");
                        fetch("https://mehblog.herokuapp.com/myblog", {
                          method: "POST",
                          headers: { "Content-type": "application/json" },
                          body: JSON.stringify(user),
                        })
                          .then((res) => res.json())
                          .then((data) => console.log(data));
                      }}
                    >
                      MyBlogs
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        routeChange("/createblog");
                      }}
                    >
                      CreateBlog
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        handleSignOut();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <Link to="/Login">Login</Link>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white w-screen flex justify-center items-center border-y-2 border-gray-300">
          <div className="container lg:hidden">
            <button onClick={() => setActive(!active)}>
              <p className="font-bold p-2 flex justify-center items-center">
                <MenuIcon />
                Category
              </p>
            </button>
            {active && (
              <ul>
                <li className="py-2 ml-3">
                  <Link to="/tech">Tech</Link>
                </li>
                <li className="py-2 ml-3">
                  <Link to="/programming">Programming</Link>
                </li>
                <li className="py-2 ml-3">
                  <Link to="/ai">AI</Link>
                </li>
                <li className="py-2 ml-3">
                  <Link to="/machinelearning">Maching Learning</Link>
                </li>
                <li className="py-2 ml-3">
                  <Link to="/blockchain">Blockchain</Link>
                </li>
              </ul>
            )}
          </div>
          <Link
            to="/tech"
            className="p-2 hidden lg:inline-flex hover:text-lime-500"
          >
            Tech
          </Link>
          <Link
            to="/programming"
            className="p-2 hidden lg:inline-flex hover:text-lime-500"
          >
            Programming
          </Link>
          <Link
            to="/ai"
            className="p-2 hidden lg:inline-flex hover:text-lime-500"
          >
            AI
          </Link>
          <Link
            to="/machinelearning"
            className="p-2 hidden lg:inline-flex hover:text-lime-500"
          >
            Maching Learning
          </Link>
          <Link
            to="/blockchain"
            className="p-2 hidden lg:inline-flex hover:text-lime-500"
          >
            Blockchain
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
