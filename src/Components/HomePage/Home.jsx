import React, { useState, useEffect } from "react";
import CatSlider from "../Slider/Slider";
import AllProducts from "../AllProducts/AllProducts";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Product from "../AllProducts/productCard/productCard";
import CategorySlider from "../CategorySlider/CategorySlider";
import Alert from "../layout/Alert/Alert"

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [currentPage, setCurrentPage] = useState();
  // const [price, setPrice] = useState([0, 20000]);
  // const [category, setCategory] = useState("");
  // const { keyword } = useParams();

  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  console.log(products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
    {/* <Alert type="success" message="Error" /> */}
      <CatSlider />
      
      <CategorySlider />
      {loading ? (
        <Loader />
      ) : (
        <div className="all_products_container">
          <h2 style={{color: 'black', fontWeight: '500', fontSize:"1rem"}} className="productstitle">Products</h2>
          <div className="all_products_max_width">
            
            <div className="cards">
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
          <div className="button" onClick={()=>navigate("/products")}>View more</div>
        </div>
      )}
    </>
  );
};

export default Home;
