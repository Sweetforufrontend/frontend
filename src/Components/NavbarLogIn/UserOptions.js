import React from "react";
import "./Navbar.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import { Backdrop } from "@mui/material";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    navigate("/products");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => {
          setOpen(true);
        }}
        open={open}
        direction="up"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "./Profile.png"}
            alt="Profile"
          />
        }
        className="speedDail"
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            style={{ zIndex: "11" }}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
