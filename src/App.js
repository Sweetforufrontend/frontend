import "./App.css";
import { getProduct } from "../src/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import AllProducts from "./Components/AllProducts/AllProducts";
import ProductDetails from "./Components/products/ProductDetails/ProductDetails";
import Search from "./Components/products/search/Search.js";
import Pagination from "react-js-pagination";
import Navbar from "./Components/NavbarLogIn/Navbar";
import NavbarLogOut from "./Components/NavbarLogOut/NavbarLogOut";
import Footer from "./Components/Footer/Footer";
import LoginSignup from "./Components/User/LoginSignup";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./Components/NavbarLogIn/UserOptions.js";
import {
  BrowserRouter as Router,
  Routes,
  useNavigation,
} from "react-router-dom";
import Profile from "./Components/User/profile";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import Cart from "./Components/Cart/Cart";
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import Shipping from "./Components/Cart/Shipping";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import Products from "./Components/products/Products.js";
import Home from "./Components/HomePage/Home";
import ProductCategory from "./Components/products/ProductCategory/ProductCategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminCheck from "./Components/AdminCheck";
import AccessDenied from "./Components/Admin/AccessDenied";
import TermsOfService from "./FooterLinks/TermsOfService";
import ContactUs from "./Components/ContactUs/ContactUs";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <ToastContainer />

      {/* <Navbar /> */}
      {isAuthenticated && isAuthenticated === true ? (
        <NavbarLogOut user={user} />
      ) : (
        <Navbar />
      )}
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/products/:keyword" element={<AllProducts />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/" element={<Home />} />
        <Route path="/acessdenied" element={<AccessDenied />} />
        <Route
          path="/products/category/:category"
          element={<ProductCategory />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/termsofservice" element={<TermsOfService />} />
        <Route path="/contactus" element={<ContactUs />} />

        {isAuthenticated && isAuthenticated === true ? (
          <>
            <Route path="/account" element={<Profile />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
          </>
        ) : (
          <></>
        )}

        {/* admin routes */}
        

        {/* company routes */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
