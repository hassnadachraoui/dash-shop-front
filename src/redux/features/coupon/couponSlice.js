import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import couponService from "./couponService";

const initialState = {
  coupon: null,
  coupons: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create Coupon
export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (formData, thunkAPI) => {
    try {
      return await couponService.createCoupon(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all Coupons
export const getCoupons = createAsyncThunk(
  "coupons/getCoupons",
  async (_, thunkAPI) => {
    try {
      return await couponService.getCoupons();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get coupon
export const getCoupon = createAsyncThunk(
  "coupons/getCoupon",
  async (couponName, thunkAPI) => {
    try {
      return await couponService.getCoupon(couponName);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete coupon
export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    REMOVE_COUPON(state, action) {
      state.coupon = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Coupon
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Coupon created  successfully.");
        console.log(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })

      // Get all coupons
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
        console.log(action.payload);
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })

      // Get coupon
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupon = action.payload;
        toast.success("Coupon applied.");
        console.log(action.payload);
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })

      // delete coupon
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
        console.log(action.payload);
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      });
  },
});

export const { REMOVE_COUPON } = couponSlice.actions;

export default couponSlice.reducer;
