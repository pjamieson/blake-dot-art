import React from "react"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import CheckoutForm from "./stripe-checkout-form"

const stripe = loadStripe(process.env.STRIPE_PK)

export default () => (
  <div>
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  </div>
)
