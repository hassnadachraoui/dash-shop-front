import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { RESET_AUTH, logout } from "../../redux/features/auth/authSlice";
import logoImg from "../../assets/dash2.webp";
import { UserName } from "../../pages/profile/Profile.js";
import { AdminOnlyLink } from "../hiddenLink/AdminOnlyRoute.js";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalQuantity,
} from "../../redux/features/product/cartSlice";

// Logo component
export const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <img src={logoImg} alt="logo" style={{ width: 60, height: 45 }} />
    </Link>
  </div>
);

// Function to define active link style
const activeLink = ({ isActive }) => (isActive ? styles.active : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the isLoggedIn state from Redux store
  const { isLoggedIn, user } = useSelector((state) => state.auth); // Accessing user state as well

  // Navbar scroll effect
  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = async () => {
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/shop" className={activeLink}>
                Shop
              </NavLink>
            </li>
            <li>
              <AdminOnlyLink>
                <NavLink to="/admin/home" className={activeLink}>
                  Admin
                </NavLink>
              </AdminOnlyLink>
            </li>
          </ul>

          <div className={styles["header-right"]}>
            <span className={styles.links}>
              {isLoggedIn ? (
                <>
                  <Link to={"/profile"}>
                    <FaUserCircle size={16} color="#ff7722" />
                    <UserName /> {/* Displaying username when logged in */}
                  </Link>
                  <NavLink to={"/order-history"} className={activeLink}>
                    My Order
                  </NavLink>
                  <Link to={"/"} onClick={logoutUser}>
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <NavLink to={"/login"} className={activeLink}>
                    Login
                  </NavLink>
                  <NavLink to={"/register"} className={activeLink}>
                    Register
                  </NavLink>
                </>
              )}
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
