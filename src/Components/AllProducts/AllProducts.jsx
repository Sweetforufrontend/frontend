import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Product from "./productCard/productCard";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./AllProducts.css";
import Loader from "../layout/Loader/Loader";
import { Typography, Slider } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import lottie from "lottie-web";
// import CatSlider from "../Slider/Slider";
import noProductsFound from "../../animation/noproductsfound.json";
import ReactLogo from "../../animation/notfound.svg";

const categories = [
  "Milk Sweets",
  "Dry Fruits Sweets",
  "Pakam Sweets",
  "Paper Sweets",
  "SugarFree Sweets",
  "Laddu",
  "MysorePak",
];

// var priceval = [100, 300];
function Home() {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { pathname } = useLocation();
  // alert(pathname)

  const [currentPage, setCurrentPage] = useState();
  const [price, setPrice] = useState([0, 20000]);
  const [category, setCategory] = useState("");
  const [priceval, setPriceval] = useState([100, 300]);
  const [allProducts, setAllProducts] = useState([]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandlerphone = (e, newPrice) => {
    // alert(priceval);
    // priceval = newPrice;
    setPriceval(newPrice);
    // setPrice(newPrice);
  };

  const finalprice = () => {
    setPrice(priceval);
  };

  const priceHandlerlaptop = (e, newPrice) => {
    setPrice(newPrice);
  };

  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect(() => {
  //   setAllProducts(products[0].products);
  // }, [products]);

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
                  value={priceval}
                  onChange={priceHandlerphone}
                  valueLabelDisplay="on"
                  aria-labelledby="range-slider"
                  min={100}
                  max={300}
                  // style={{width: '80%'}}
                  className="slider"
                />

                <Typography>Categories</Typography>
                {categories.map((cat) => (
                  <li
                    className="category-link"
                    key={cat}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </li>
                ))}

                <div
                  style={{
                    backgroundColor: "white",
                    fontSize: "1rem",
                    width: "90%",
                    height: "auto",
                    padding: ".4rem",
                    color: "green",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "3rem",
                  }}
                  onClick={() => finalprice()}
                >
                  Apply
                </div>
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
              <div className="cards" id="card">
                {/* {deanimation()} */}
                {products &&
                products.length > 0 &&
                products[0].products.length !== undefined &&
                products[0].products.length > 0 ? (
                  products[0].products.map((product) => {
                    return (
                      <>
                        <Product product={product} />
                      </>
                    );
                  })
                ) : (
                  <div className="emptyproducts">
                    <img
                      src={ReactLogo}
                      alt="React Logo"
                      style={{
                        height: "20rem",
                        width: "100%",
                        marginBottom: ".5rem",
                      }}
                    />
                    <h1
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // backgroundColor: "pink",
                      }}
                    >
                      No Products Found
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandlerlaptop}
              // valueLabelDisplay="auto"
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              min={100}
              max={300}
              // style={{width: '80%'}}
              className="slider"
            />

            <Typography>Categories</Typography>
            {categories.map((cat) => (
              <li
                className="category-link"
                key={cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </li>
            ))}
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
