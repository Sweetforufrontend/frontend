import React, { useState, useEffect } from "react";
import css from "./CategorySlider.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const categories = [
  "Milk Sweets",
  "DryFruit Sweets",
  "Pakam Sweets",
  "Potharekulu",
  "SugarFree",
  "Laddu",
  "MysorePak",
];

const CategorySlider = () => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <h2
        style={{
          color: "black",
          fontWeight: "500",
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "auto",
        }}
      >
        Categories
      </h2>
      <div className={css.category_container}>
        {categories.map((cat) => {
          return (
            <div
              className={css.item}
              onClick={() => navigate(`/products/category/${cat}`)}
            >
              <div className={css.category_image}>
                <img
                  src="/milkiteam.jpeg"
                  alt=""
                  style={{
                    // width: "90%",
                    // height: "90%",
                    objectFit: "fill",
                    borderRadius: "200px",
                  }}
                />
              </div>
              {/* <h1 className={css.categoryname}>{cat}</h1> */}
              <h1 className={css.categoryname}>{cat}</h1>
            </div>
          );
        })}
      </div>
      {/* <div className={css.namesgrid}>
      {categories.map((cat) => {
        return (
         
            <h1 className={css.categoryname}>{cat}</h1>
         
        );
      })}
      </div> */}
    </div>
  );
};

export default CategorySlider;
