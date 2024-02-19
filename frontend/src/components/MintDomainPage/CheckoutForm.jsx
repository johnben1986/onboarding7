import styles from "./CheckoutForm.module.scss";
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAPI } from "../../hooks/useAPI";

export default function CheckoutForm({ price, redirectUrl, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { api } = useAPI();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(async ({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            onSuccess(paymentIntent.id);
            
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      
      
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        
        return_url: redirectUrl,
      },
      redirect: "if_required",
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    }

    
    const { paymentIntent } = await stripe.retrievePaymentIntent(
      elements._commonOptions.clientSecret.clientSecret,
    );

    if (paymentIntent.status === "succeeded") {
      setMessage("Payment succeeded!");
      onSuccess(paymentIntent.id);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        className={styles.payNowBtn}
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            `Pay ${(price / 100).toFixed(2)}$`
          )}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
