import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import Card from "./../../card/Card";
import {
  createBrand,
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { toast } from "react-toastify";

const CreateBrand = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const saveBrand = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      return toast.error("Brand name must be up to 3 characters");
    }
    if (!category) {
      return toast.error("Please add a parent category");
    }
    const formData = {
      name,
      category,
    };
    await dispatch(createBrand(formData));
    await dispatch(getBrands());
    setName("");
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="--mb2">
        <h3>Create Brand</h3>
        <p>
          Use the form to <b>Create a Brand.</b>
        </p>
        <Card cardClass={"card"}>
          <br />
          <form onSubmit={saveBrand}>
            <label>Brand Name:</label>
            <input
              type="text"
              placeholder="Brand name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Parent Category: </label>
            <select
              name="category"
              className="from-control"
              onClick={(e) => setCategory(e.target.value)}
            >
              <option>Select category</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save Brand
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateBrand;
