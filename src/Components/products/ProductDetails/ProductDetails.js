import React from "react";
import css from "./ProductDetails.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useParams } from "react-router-dom";
import { getProductDetails } from "../../../actions/productAction";

const ProductDetails = ({ match }) => {
  const { id } = useParams();
  //   console.log(match.id);
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  //   console.log(id);
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <div className={css.ProductDetails}>
        {product && (
          <>
            <h1>{product.name}</h1>
            {product.images.map((item, i) => {
              return <img src={item.url} alt="" />;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
