import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.js";
import Header from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";
import Login from "./pages/auth/Login.js";
import Register from "./pages/auth/Register.js";
import Profile from "./pages/profile/Profile.js";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser } from "./redux/features/auth/authSlice.js";
import Admin from "./pages/admin/Admin.js";
import AdminOnlyRoute from "./components/hiddenLink/AdminOnlyRoute.js";
import NotFound from "./pages/404/NotFound.js";
import Product from "./pages/shop/Product.js";
import Cart from "./pages/cart/Cart.js";
import ProductDetails from "./components/product/productDetails/ProductDetails.js";
import CheckoutDetails from "./pages/checkout/CheckoutDetails.js";
import CheckoutPaypal from "./pages/checkout/CheckoutPaypal.js";
import Checkout from "./pages/checkout/Checkout.js";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess.js";
import OrderDetails from "./pages/order/OrderDetails.js";
import OrderHistory from "./pages/order/OrderHistory.js";
import CheckoutWithFlutterwave from "./pages/checkout/CheckoutWithFlutterwave.js";

const App = () => {
  axios.defaults.withCredentials = true;
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/shop" element={<Product />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />

          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout-stripe" element={<Checkout />} />
          <Route
            path="/checkout-flutterwave"
            element={<CheckoutWithFlutterwave />}
          />
          <Route path="/checkout-paypal" element={<CheckoutPaypal />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
