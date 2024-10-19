import { configureStore, createReducer } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice.js";
import categoryReducer from "../redux/features/categoryAndBrand/categoryAndBrandSlice.js";
import productReducer from "../redux/features/product/productSlice.js";
import couponReducer from "../redux/features/coupon/couponSlice.js";
import filterReducer from "../redux/features/product/filterSlice";
import cartReducer from "../redux/features/product/cartSlice.js";
import checkoutReducer from "../redux/features/checkout/checkoutSlice.js";
import orderReducer from "../redux/features/order/orderSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    coupon: couponReducer,
    filter: filterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
  },
});
