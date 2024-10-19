import React from "react";
import "./Brand.scss";
import CreateBrand from "./CreateBrand";
import BrandList from "./BrandList";
import { useDispatch } from "react-redux";
import { getBrands } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const Brand = () => {
  return (
    <section>
      <div className="Container coupon">
        <CreateBrand />
        <BrandList />
      </div>
    </section>
  );
};

export default Brand;
