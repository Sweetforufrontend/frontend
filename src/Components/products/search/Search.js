import React, { useState, useEffect } from "react";
import css from "./search.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, Slider } from "@mui/material";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { getProduct } from "../../../actions/productAction";

const categories = [
  "Milk Sweets",
  "Dry Fruits Sweets",
  "Pakam Sweets",
  "Paper Sweets",
  "SugarFree Sweets",
  "Laddu",
  "MysorePak",
];

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  // useEffect(() => {
  //   navigate(`/products/${category}`);
  // }, [category]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // alert('hii')
      navigate(`/products/${keyword}`);
      // history.push(`/products/${keyword}`);
    } else {
      navigate("/products");
      // history.push("/products");
    }
  };

  return (
    <>
      <div className={css.container}>
        <form className={css.searchBox} onSubmit={searchSubmitHandler}>
          <FiX
            size={32}
            style={{ color: "white", marginTop: "1rem", marginBottom: "1rem" }}
            className={css.icon}
            onClick={() => navigate("/")}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "auto",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              placeholder="Search a product..."
              onChange={(e) => setKeyword(e.target.value)}
              autoFocus={false}
            />
            <input type="submit" value="search" autoFocus />
          </div>
        </form>

        <Typography>Categories</Typography>
        <div
          style={{
            marginTop: "5rem",
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {categories.map((cat) => (
            <li
              className={css.categoryLink}
              key={cat}
              onClick={() => navigate(`/products/category/${cat}`)}
            >
              {cat}
            </li>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
