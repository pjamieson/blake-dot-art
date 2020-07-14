import React, { useEffect, useState, useContext } from "react"
import { useStripe, useElements } from "@stripe/react-stripe-js"

import CardSection from "./stripe-card-section"

import { CartContext } from "../context/cart-context"

import { formatPrice } from "../utils/format"

export default () => {
  const stripe = useStripe()
  const elements = useElements()

  const {cart} = useContext(CartContext)

  const [token, setToken] = useState(null)
  const [total, setTotal] = useState("Loading.......")

  const handleSubmit = (event) => {
    console.log("handleSubmit", event)
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    //event.preventDefault()
/*
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const result = await stripe.confirmCardPayment('{process.env.STRIPE_SK}', {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    } */
  }

  useEffect(() => {
    const loadToken = async () => {
      const response = await fetch("http://localhost:1337/orders/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cart: cart.map(item => (
            {...item, ...{id: item.id}}
          ))
        })
      })
      const data = await response.json()
      console.log("loadToken data", data)
      setToken(data.client_secret)
    }
    loadToken()
  })

  if (token) {
    return (
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button disabled={!stripe}>Place Order</button>
      </form>
    )
  } else {
    return (
      <p>Loading...</p>
    )
  }
}
