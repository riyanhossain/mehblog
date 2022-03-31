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

  const handleSignOut = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser({ signIn: false });
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const [user, setUser] = useContext(UserContext);
  const profileImage = user.photoURL;
  console.log(user);
  const [active, setActive] = useState(false);
  const [activeProfile, setActiveProfile] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <nav className="bg-[#AAD1A6]  w-screen flex flex-col items-center">
        <div className="p-5 flex justify-between w-screen items-center lg:w-[1400px]">
          <div className="ml-4 flex">
            <p className="text-2xl font-semibold text-white">
              <Link to="/">MehBlog</Link>
            </p>

            <input
              className="ml-1 md:ml-6  border-2 border-gray-300 bg-white h-10 px-5 pr-0 md:pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
          </div>
          <div className="mr-4">
            {user.signIn ? (
              <div className="flex justify-center">
                <div className="flex justify-center items-center">
                  <button
                    className="hidden p-2 bg-yellow-500 rounded border-0 pl-2 pr-2 mr-2 text-white lg:inline-flex"
                    onClick={() => navigate("/createblog")}
                  >
                    Create Blog
                  </button>
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
                    {user.displayName}
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
                    <MenuItem onClick={handleClose}>Home</MenuItem>
                    <MenuItem onClick={handleClose}>MyBlog</MenuItem>
                    <MenuItem onClick={handleClose}>CreateBlog</MenuItem>
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
          <Link to="/tech" className="p-2 hidden lg:inline-flex hover:text-lime-500">
            Tech
          </Link>
          <Link to="/programming" className="p-2 hidden lg:inline-flex hover:text-lime-500">
            Programming
          </Link>
          <Link to="/ai" className="p-2 hidden lg:inline-flex hover:text-lime-500">
            AI
          </Link>
          <Link to="/machinelearning" className="p-2 hidden lg:inline-flex hover:text-lime-500">
            Maching Learning
          </Link>
          <Link to="/blockchain" className="p-2 hidden lg:inline-flex hover:text-lime-500">
            Blockchain
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
