import React, { useEffect, useState } from "react";
import "./AddProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import ProductForm from "../productForm/ProductForm";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import {
  createProduct,
  RESET_PROD,
} from "../../../redux/features/product/productSlice";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  category: "",
  brand: "",
  quantity: "",
  price: "",
  color: "",
  regularPrice: "",
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const { isLoading, message } = useSelector((state) => state.product);

  const { name, category, brand, quantity, price, color, regularPrice } =
    product;

  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    if (files.length < 1) {
      return toast.error("Please add an image");
    }

    const formData = {
      name,
      sku: generateSKU(category),
      category,
      brand,
      color,
      quantity: Number(quantity),
      regularPrice,
      price,
      description,
      image: files,
    };
    // console.log(formData);
    await dispatch(createProduct(formData));

    //  navigate("/admin/all-products");
  };
  useEffect(() => {
    if (message === "Product created successfully.") {
      navigate("/admin/all-products");
    }
    dispatch(RESET_PROD());
  }, [message, navigate, dispatch]);

  return (
    <section>
      <div className="container">
        {isLoading && <Loader />}
        <h3 className="--mt">Add New Prodcut</h3>

        <ProductForm
          saveProduct={saveProduct}
          product={product}
          setProduct={setProduct}
          isEditing={false}
          description={description}
          setDescription={setDescription}
          files={files}
          setFiles={setFiles}
        />
      </div>
    </section>
  );
};

export default AddProduct;
