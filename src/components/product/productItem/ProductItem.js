import React from 'react';
import styles from "./ProductItem.module.scss";
import Card from '../../card/Card';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { shortenText, calculateAverageRating } from "../../../utils";
import DOMPurify from "dompurify";
import ProductRating from '../productRating/ProductRating';
import { ADD_TO_CART, saveCartDB } from '../../../redux/features/product/cartSlice';
import { useDispatch } from 'react-redux';

const ProductItem = ({
    product,
    grid,
    _id,
    name,
    price,
    // description,
    image,
    regularPrice,
    // ratings,
}) => {
    const dispatch = useDispatch();

    const averageRating = calculateAverageRating(product.ratings);

    const addToCart = (product) => {
        dispatch(ADD_TO_CART(product));
        // dispatch(CALCULATE_TOTAL_QUANTITY());
        dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) }));
    };

    return (
        <Card cardClass={grid ? styles.grid : styles.list}>
            <Link to={`/product-details/${_id}`}>
                <div className={styles.img}>
                    <img src={image[0]} alt={name} />
                </div>
            </Link>
            <div className={styles.content}>
                <div className={styles.details}>
                    <p><span>{regularPrice > 0 && <del>${regularPrice}</del>}</span>{` $${price} `}</p>
                    <ProductRating averageRating={averageRating} noOfRatings={product?.ratings?.length} />
                    <h4>{shortenText(name, 18)}</h4>

                    {!grid && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(shortenText(product?.description, 200)),
                            }}
                        ></div>
                    )}

                    {product?.quantity > 0 ? (
                        <button
                            className="--btn --btn-primary"
                            onClick={() => addToCart(product)}
                        >
                            Add To Cart
                        </button>
                    ) : (
                        <button
                            className="--btn --btn-red"
                            onClick={() => toast.error("Sorry, Product is out of stock")}
                        >
                            Out Of Stock
                        </button>
                    )}
                </div>
            </div>
        </Card>
    );
}

export default ProductItem;