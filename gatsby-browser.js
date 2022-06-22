/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Global style files for MDBReact
import "./src/styles/fontawesome/css/all.min.css"
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import "./src/styles/scss/mdb-pro.scss"

//import "@stripe/stripe-js"

import React from "react"
import CartContextProvider from "./src/context/cart-context"

export const wrapRootElement = ({element}) => (
  <CartContextProvider>
    {element}
  </CartContextProvider>
)
