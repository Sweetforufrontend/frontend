import css from "./FeaturedProducts.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProduct } from "../../../actions/productAction";
import ProductCard from "../../AllProducts/productCard/productCard";

const FeaturedProducts = ({ items, name }) => {
  // alert(items);
  const dispatch = useDispatch();

  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Frequently Bought Together</h1>
      <div className={css.gridholder}>
        {products && products.length > 0 ? (
          products[0].products.map((product, index) => {
            if (index < items && product.name !== name) {
              return (
                <div className={css.product}>
                  <ProductCard product={product} />
                </div>
              );
            }
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
