/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Global style files for MDBReact
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap-css-only/css/bootstrap.min.css"
import "mdbreact/dist/css/mdb.css"
import "./src/styles/scss/mdb.scss"

import "@stripe/stripe-js"

import React from "react"
import CartContextProvider from "./src/context/cart-context"

export const wrapRootElement = ({element}) => (
  <CartContextProvider>
    {element}
  </CartContextProvider>
)
