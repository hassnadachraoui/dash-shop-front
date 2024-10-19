import React, { useEffect, useState } from 'react';
import styles from "./Product.module.scss";
import { FaCogs } from "react-icons/fa";
import { Spinner } from "../../components/loader/Loader";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/features/product/productSlice';
import ProductList from '../../components/product/productList/ProductList';
import ProductFilter from '../../components/product/productFilter/ProductFilter';

const Product = () => {
    const dispatch = useDispatch();
    const [showFilter, setShowFilter] = useState(false);
    const { isLoading, products } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    return (
        <section>
            <div className={`${styles.container} ${styles.product}`}>
                <aside
                    className={
                        showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
                    }
                >
                    {isLoading ? null : <ProductFilter />}
                </aside>
                <div className={styles.content}>
                    {isLoading ? <Spinner /> : <ProductList products={products} />}
                    <div className={styles.icon} onClick={toggleFilter}>
                        <FaCogs size={20} color="orangered" />
                        <p>
                            <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;