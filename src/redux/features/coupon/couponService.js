import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/coupon/`;

// Create Coupon
const createCoupon = async (formData) => {
  const response = await axios.post(API_URL + "createCoupon", formData);
  return response.data;
};

// Get all Coupons
const getCoupons = async () => {
  const response = await axios.get(API_URL + "getCoupons");
  return response.data;
};

// Get Coupon
const getCoupon = async (couponName) => {
  if (!couponName) throw new Error("Coupon name is required");
  const response = await axios.get(API_URL + couponName);
  return response.data;
};

// Delete Coupons
const deleteCoupon = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data.message;
};

const couponService = {
  createCoupon,
  getCoupons,
  getCoupon,
  deleteCoupon
};

export default couponService;
