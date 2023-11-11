import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51MfKkBSIpbC180GjBFJcakjOzpcIbXmA0260atf3qgoRWsLskQFUiRpTJ5zRwO19dR9SybMcqFl4OYiPH6SLfmt000AXKF1VNs");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder=useSelector(selectCurrentOrder)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3004/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount:currentOrder.totalAmount }),
      meta:{
        order_id:currentOrder.id //this data will go to stripe and webhook 
                                  //so that sending mails to user about order confirmation is independent of client
      }
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}