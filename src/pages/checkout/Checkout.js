import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/features/product/cartSlice";
import { selectPaymentMethod } from "../../redux/features/checkout/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkout/checkoutForm/CheckoutForm";
import { selectUser } from "../../redux/features/auth/authSlice";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "../../redux/features/product/checkoutSlice";
import { extractIdAndCartQuantity } from "../../utils";

// Charge Stripe uniquement en HTTPS ou en mode développement
const stripePromise = process.env.NODE_ENV === "development"
  ? loadStripe(process.env.REACT_APP_STRIPE_PK)
  : window.location.protocol === "https:"
  ? loadStripe(process.env.REACT_APP_STRIPE_PK)
  : null; // Ne charge pas Stripe si en production sans HTTPS

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const user = useSelector(selectUser);
  const customerEmail = user?.email;

  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);
  const { coupon } = useSelector((state) => state.coupon);
  const paymentMethod = useSelector(selectPaymentMethod); // Utilise le sélecteur pour la méthode de paiement
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon: coupon }));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems, coupon]);

  const description = `dashShop payment: email: ${customerEmail}, Amount: ${totalAmount}`;
  const productIDs = extractIdAndCartQuantity(cartItems);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/order/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: productIDs,
          userEmail: customerEmail,
          shipping: shippingAddress,
          billing: billingAddress,
          description,
          coupon,
          paymentMethod, // Utilise la variable ici
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!!");
      });
  }, [paymentMethod]); // Ajoute les dépendances nécessaires

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && stripePromise && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
