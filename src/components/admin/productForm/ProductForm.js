import React, { useEffect, useState } from "react";
import "./ProductForm.scss";
import Card from "../../card/Card";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "./UploadWidget";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const ProductForm = ({
  saveProduct,
  isEditing,
  product,
  setProduct,
  description,
  setDescription,
  files,
  setFiles,
}) => {
  const dispatch = useDispatch();
  const [filteredBrands, setFilteredBrands] = useState([]);
  const { categories, brands } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  //Filter Brands based on selectedCategory
  const filterBrands = (selectedCategory) => {
    const newBrands = brands.filter(
      (brand) => brand.category === selectedCategory
    );
    setFilteredBrands(newBrands);
  };
  useEffect(() => {
    filterBrands(product?.category);
  }, [product?.category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const removeImage = (image) => {
    setFiles(files.filter((img) => img !== image));
  };

  return (
    <div className="add-product">
      <UploadWidget files={files} setFiles={setFiles} />
      <Card cardClass={"card"}>
        <br />
        <form onSubmit={saveProduct}>
          <label>Product Images:</label>
          <div className="slide-container">
            <aside>
              {files.length > 0 &&
                files.map((image) => (
                  <div key={image} className="thumbnail">
                    <img src={image} alt="productImage" height={100} />
                    <div>
                      <BsTrash
                        size={25}
                        className="thumbnailIcon"
                        onClick={() => removeImage(image)}
                      />
                    </div>
                  </div>
                ))}
              {files.length < 1 && (
                <p className="--m">No image set for this product.</p>
              )}
            </aside>
          </div>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
            required
          />
          <label>Product Category:</label>
          <select
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option value={product?.category}>{product?.category}</option>
            ) : (
              <option>Select Category</option>
            )}
            {categories.length > 0 &&
              categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>
          <label> Product Brand:</label>
          <select
            name="brand"
            value={product?.brand}
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option value={product?.brand}>{product?.brand}</option>
            ) : (
              <option>Select Brand</option>
            )}
            {filteredBrands.length > 0 &&
              filteredBrands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
          </select>
          <label> Product Color:</label>
          <input
            type="text"
            placeholder="Color"
            name="color"
            value={product?.color}
            onChange={handleInputChange}
          />
          <label> Regular Price:</label>
          <input
            type="number"
            placeholder="Regular Price"
            name="regularPrice"
            value={product?.regularPrice}
            onChange={handleInputChange}
          />
          <label> Product Price:</label>
          <input
            type="number"
            placeholder="Product Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />
          <label> Product Quantity:</label>
          <input
            type="number"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />
          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
