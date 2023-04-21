import React, { useEffect } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import ProductCard from "../AllProducts/productCard/productCard";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      <h2 className="productsHeading">Products</h2>
      <div className="products">
        {products && products.length > 0 ? (
          products[0].products.map((product) => {
            return (
              <>
                {/* <h2>{product.price}</h2>
              <h1>{product.name}</h1> */}
                <ProductCard product={product} />
              </>
            );
          })
        ) : (
          <>
            <h1>loading</h1>
          </>
        )}
      </div>
    </>
  );
};

export default Products;
