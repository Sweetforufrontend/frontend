import { getProduct } from "../../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import Product from "../../AllProducts/productCard/productCard";
import { Routes, Route, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./ProductCategory.module.css";

import Loader from "../../../Components/layout/Loader/Loader";
import { Typography, Slider } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
// import CatSlider from "../Slider/Slider";

// const categories = [
//   "Milk Sweets",
//   "Dry Fruits Sweets",
//   "Pakam Sweets",
//   "Paper Sweets",
//   "SugarFree Sweets",
//   "Laddu",
//   "MysorePak",
// ];

function Home() {
  const dispatch = useDispatch();
  const { category } = useParams();
  //   alert(category)

  const [currentPage, setCurrentPage] = useState();
  const [price, setPrice] = useState([0, 20000]);
  //   const [category, setCategory] = useState("");

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct("", currentPage, price, category));
  }, [dispatch, category, currentPage, price]);

  const handleFilterToggle = () => {
    document.getElementById("filtercontainer").style.left = 0;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <CatSlider /> */}
          <div className="all_products_container">
            <div className="filter-container" id="filtercontainer">
              <AiFillCloseSquare
                size={32}
                style={{ position: "relative", right: "-89%", top: "0%" }}
                onClick={() => {
                  document.getElementById("filtercontainer").style.left =
                    "-70%";
                }}
              />

              <div>
                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={100}
                  max={20000}
                  // style={{width: '80%'}}
                  className="slider"
                />

                {/* <Typography>Categories</Typography>
                {categories.map((cat) => (
                  <li
                    className="category-link"
                    key={cat}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </li>
                ))} */}
              </div>
            </div>

            <h3
              style={{ fontSize: "1.5rem", padding: "1rem", display: "flex" }}
            >
              Products
            </h3>
            <div className="filter-options-holder">
              <div
                className="filter-button"
                onClick={() => handleFilterToggle()}
              >
                <FaFilter className="filter-icon" />
                Filters
              </div>
            </div>
            <div className="all_products_max_width">
              <div className="cards">
                {console.log(products)}
                {products && products.length > 0 ? (
                  products[0].products.map((product) => {
                    return (
                      <>
                        <Product product={product} />
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={100}
              max={20000}
              // style={{width: '80%'}}
              className="slider"
            />

            {/* <Typography>Categories</Typography>
            {categories.map((cat) => (
              <li
                className="category-link"
                key={cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </li>
            ))} */}
          </div>
          {/* {console.log(len())} */}

          {/* {alert("hii")} */}

          {products && resultPerPage < productsCount ? (
            // (alert("jai"),
            <div className="cardspagination">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
export default Home;
