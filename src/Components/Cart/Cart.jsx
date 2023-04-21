import React, { useState } from "react";
import css from "./Cart.module.css";
import CartItemCard from "./CartItemCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartActions";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const increaseQuantity = (id, quantity, shopname) => {
    const newQuantity = quantity + 1;
    // if (stock <= quantity){
    //   return;
    // }
    dispatch(addItemsToCart(id, newQuantity, shopname));
  };

  const decreaseQuantity = (id, quantity, shopname) => {
    const newQuantity = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQuantity, shopname));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
    toast.success("Item Removed Succesfully !", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <div className={css.emptyCart}>
          <MdOutlineRemoveShoppingCart size={32} />
          <h3>Your Cart Is Empty!!!</h3>
          <Link to="/products">Explore Products</Link>
        </div>
      ) : (
        <>
          <div className={css.cartPage}>
            <div className={css.cartHeader}>
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className={css.cartcontainer} key={item.product}>
                  <CartItemCard item={item} deleteCartItem={deleteCartItems} />
                  {item.quantity <= 30 ? (
                    <div className={css.cartInput}>
                      <button
                        onClick={() => {
                          decreaseQuantity(
                            item.product,
                            item.quantity,
                            item.shopname
                          );
                        }}
                      >
                        -
                      </button>
                      <input type="number" readOnly value={item.quantity} />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.shopname
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <>
                      <a
                        href="/home"
                        style={{
                          color: "dodgerblue",
                          fontSize: "1rem",
                          margin: "auto 0",
                        }}
                      >
                        Contact Us
                      </a>
                    </>
                  )}
                  <p className={css.cartSubtotal}>
                    {`₹ ${item.price * item.quantity}`}
                  </p>
                </div>
              ))}

            <div className={css.cartGrossProfit}>
              <div className={css.leftdiv}></div>
              <div className={css.cartGrossProfitBox}>
                <p>Gross Total</p>
                <p>{`₹ ${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className={css.checkOutBtn}>
                {/* <button onClick={checkoutHandler} classname={css.but}>Check Out</button> */}
                <div onClick={checkoutHandler} className={css.but} style={{}}>
                  Checkout
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
