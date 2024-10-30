import React from "react";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartTotalAmount } from "../../redux/features/product/cartSlice";
import { selectUser } from "../../redux/features/auth/authSlice";

const CheckoutWithFlutterwave = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  function makePayment() {
    
    FlutterwaveCheckout({
      public_key: process.env.REACT_APP_FLW_PK,
      tx_ref: process.env.REACT_APP_TX_REF,
      amount: cartTotalAmount,
      currency: "USD",
      payment_options: "card, banktransfer, ussd",
      redirect_url: `${process.env.REACT_APP_BACKEND_URL}/api/order/response`,
      //meta: {
      //source: "docs-inline-test",
      //consumer_mac: "92a3-912ba-1192a",
      //},
      customer: {
        email: user?.email,
        phone_number: user?.phone,
        name: user?.name,
      },
      customizations: {
        title: "DashShop Online Store",
        description: "Payment for products",
        logo: "https://checkout.flutterwave.com/assets/img/rave-logo.png",
      },
    });
  }
  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>
        <form>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>Flutterwave Checkout</h3>
              <button
                type="button"
                className={styles.button}
                onClick={makePayment}
              >
                Pay Now
              </button>
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutWithFlutterwave;
