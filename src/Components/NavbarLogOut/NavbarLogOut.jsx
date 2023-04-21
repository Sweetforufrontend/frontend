import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import UserOptions from "../NavbarLogIn/UserOptions";
import { useSelector, useDispatch } from "react-redux";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { BiSearch } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";

// import store from "../../store";
// import { loadUser } from "../../actions/userAction";
const Navbar = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [menuOpened, setmenuOpened] = useState(false);
  const [width, setWidth] = useState(0);
  const [st, setSt] = useState({});
  var k = 0;
  // console.log(document.getElementsByClassName("menu")[0]);
  // var document = { display: "none" };
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
    // alert(window.innerWidth);
    // console.log(width);
    if (window.innerWidth >= 724) {
      setSt({ display: "flex" });
    } else {
      setSt({ display: "none" });
    }
    // isMobile = window.innerWidth < 700 ? true : false;
  };

  // call your useEffect
  useEffect(() => {
    // store.dispatch(loadUser());
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const toggleMenu = () => {
    setmenuOpened(!menuOpened);
    if (menuOpened === true) {
      setSt({ display: "none" });
    } else {
      setSt({ display: "block" });
    }
  };

  const options = [
    { icon: <ListAltOutlinedIcon />, name: "orders", func: orders },
    { icon: <Person2OutlinedIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function logoutUser() {
    dispatch(logout());
    alert("loggedout");
  }

  // if (isAuthenticated && isAuthenticated === true) {}

  return (
    <div className="container">
      <div className="max_width">
        <div className="parent">
          <div className="logo">
            <div className="menu">
              {menuOpened === false ? (
                <FiMenu
                  size={18}
                  onClick={toggleMenu}
                  style={{ color: "white", marginRight: "1rem" }}
                />
              ) : (
                <FiX
                  size={18}
                  onClick={toggleMenu}
                  style={{ color: "white", marginRight: "1rem" }}
                />
              )}
              {/* <FiMenu size={18} onPress={toggleMenu}/> */}
            </div>
            <a
              href="/"
              className="logoimage"
              style={{
                width: 100,
                height: 100,
                display: "block",
              }}
            >
              <img
                src="/logoneweditedx.png"
                alt="image"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              {/* Sweet4U */}
            </a>
          </div>
          <div className="search">
            <input
              type="text"
              onClick={() => navigate("/search")}
              onFocus="blur"
              readOnly
              inputMode="none"
            />
          </div>
          {/* {menuOpened === true ? ( */}
          <div className="navlink_holder" style={st}>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                {" "}
                <a href="/contactus">Contact Us</a>
              </li>
            </ul>
          </div>
          {/* ) : ( */}
          {/* <></> */}
          {/* )} */}

          <div className="login_cart_holder">
            <a href="/search">
              <BiSearch size={18} className="searchicon" />
            </a>
            <a href="/cart">
              <FiShoppingCart size={18} />
              <span
                style={{
                  fontSize: ".8rem",
                  backgroundColor: "red",
                  margin: ".5rem",
                }}
              >
                {cartItems.length}
              </span>
            </a>
            {/* <a></a> */}

            {/*<a href="/login">Login</a> */}
            {/* <UserOptions user={user} /> */}
          </div>
        </div>
        {/* <div className="bottom_search">
          <input type="text" />
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
