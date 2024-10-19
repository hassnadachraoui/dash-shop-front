import React from "react";
import "./Category.scss";
import CreateCategory from "./CreateCategory";
import CategoryList from "./CategoryList";
import { getCategories } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { useDispatch } from "react-redux";

const Category = () => {
  
  return (
    <section>
      <div className="container coupon">
        <CreateCategory />
        <CategoryList />
      </div>
    </section>
  );
};

export default Category;
