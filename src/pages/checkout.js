import React from "react"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CheckoutComponent from "../components/checkout"

import { MDBContainer, MDBRow } from 'mdbreact'

const promise = loadStripe(process.env.STRIPE_PK)

const CheckoutPage = () => {
  return (
    <Layout>
      <SEO title="Checkout" />
      <div className="container page-container checkout">
        <MDBContainer>
          <h1 className="page-head">Checkout</h1>
          <MDBRow center>
            <Elements stripe={promise}>
              <CheckoutComponent />
            </Elements>
          </MDBRow>
        </MDBContainer>
      </div>
    </Layout>
  )
}

export default CheckoutPage;
