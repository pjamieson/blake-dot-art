import React, { useState, useCallback, useContext } from 'react';
import Img from "gatsby-image"

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Checkout from "../components/checkout"

import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon
} from 'mdbreact';

import { cartSubtotal } from "../utils/cart"
import { formatPrice } from "../utils/format"

const CartPage = () => {
  const { cart, addToCart } = useContext(CartContext)

  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <Layout>
      <SEO title="Cart" />
      <div className="container page-container">
        <MDBContainer className="cart">
          <h1>Cart</h1>
          <MDBRow className='my-2' center>
            <MDBCard className='w-100'>
              <MDBCardBody>
                <div className="table-responsive">
                  {(cart && cart.length > 0) &&
                  <MDBTable className='product-table'>
                    <MDBTableHead color="default-color">
                      <tr>
                        <th scope="col"> </th>
                        <th scope="col" className="text-left">Item</th>
                        <th scope="col" className="text-right">Price</th>
                        <th scope="col"className="text-center">Quantity</th>
                        <th scope="col"className="text-right">Amount</th>
                        <th scope="col"> </th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {cart.map(item => {
                        return <tr key={item.identifier}>
                          <td className="img-cell">
                            <Img className="cart-image" fluid={item.fluid} alt={item.title}/>
                          </td>
                          <td className="item-cell">
                            <div className="cart-item">
                              <h4 className='mt-3' key={item.identifier}>
                                {item.title}
                              </h4>
                              <p className='text-muted'>{item.subtitle}</p>
                            </div>
                          </td>
                          <td className="item-price text-right">
                            {formatPrice(item.price)}
                          </td>
                          <td className="qty-cell">
                            {item.qty === item.qtyAvail &&
                              <p className="qty">{item.qty}</p>
                            }
                            {item.qty < item.qtyAvail &&
                              <div className="number-input">
                                <button type="button" className="minus"
                                  onClick={() => {
                                    addToCart(item, -1)
                                    forceUpdate()
                                  }}>
                                  <i className="fa fa-chevron-down" aria-hidden="true"> </i>
                                </button>
                                <input type="number" value={item.qty} />
                                <button type="button" className="plus"
                                  onClick={() => {
                                    addToCart(item, 1)
                                    forceUpdate()
                                  }}>
                                  <i className="fa fa-chevron-up" aria-hidden="true"></i>
                                </button>
                              </div>
                            }
                          </td>
                          <td className="item-price text-right">
                            {formatPrice(item.price * item.qty)}
                          </td>
                          <td className="remove-cell">
                            <MDBBtn size="md">
                              <MDBIcon icon="trash-alt" size="lg" aria-hidden="true"
                                onClick={() => {
                                  addToCart(item, -(item.qty))
                                  forceUpdate()
                                }}>
                              </MDBIcon>
                            </MDBBtn>
                          </td>
                        </tr>
                      })}
                      <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td className="item-price text-right">Subtotal:</td>
                        <td className="item-price text-right">
                          {formatPrice(cartSubtotal(cart))}
                        </td>
                        <td> </td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                  }
                  {(cart && cart.length === 0) && <h3>Your cart is empty.</h3>}
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
          <div className="checkout-open">
            {cart && cart.length > 0 &&
              <button type="button" className="btn btn-success btn-rounded" onClick={() => setShowCheckout(true)}>
                Checkout
              </button>
            }
          </div>
          {/*showCheckout &&
            <Checkout />
          */}
        </MDBContainer>
      </div>
    </Layout>
  )
}

export default CartPage;
