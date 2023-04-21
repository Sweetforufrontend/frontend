import React, { useState, useEffect } from "react";
import "../NavbarLogOut/Navbar.css";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpened, setmenuOpened] = useState(false);
  const [width, setWidth] = useState(0);
  const [st, setSt] = useState({});
  var k = 0;
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  // console.log(document.getElementsByClassName("menu")[0]);
  // var document = { display: "none" };
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);

    if (window.innerWidth >= 724) {
      setSt({ display: "flex" });
    } else {
      setSt({ display: "none" });
    }
    // isMobile = window.innerWidth < 700 ? true : false;
  };

  // call your useEffect
  useEffect(() => {
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

  // if (isAuthenticated && isAuthenticated === true) {}

  return (
    <div className="container">
      <div className="max_width">
        <div className="parent">
          <div className="logo">
            <div className="menu">
              {menuOpened === false ? (
                <FiMenu
                  size={20}
                  onClick={toggleMenu}
                  style={{ color: "white", marginRight: "1rem" }}
                />
              ) : (
                <FiX
                  size={20}
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
                {/* <a href="/products">Home</a> */}
                <a href="/">Home</a>
              </li>

              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                <a href="/contactus">Contact Us</a>
              </li>
            </ul>
          </div>
          {/* ) : ( */}
          {/* <></> */}
          {/* )} */}

          <div className="login_cart_holder">
            {/* <a href="/search">
              <BiSearch size={18} />
            </a> */}
            <a href="/search">
              <BiSearch size={18} className="searchicon"/>
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

            <a href="/login">Login</a>
          </div>
        </div>
        {/* <div className="bottom_search">
          <input type="text" onClick={() => navigate("/search")} />
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
