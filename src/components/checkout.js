import React, { useEffect, useState, useCallback, useContext } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { navigate } from "gatsby"
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBStep,
  MDBStepper
} from 'mdbreact'

import CardSection from "../components/stripe-card-section"

import { CartContext } from "../context/cart-context"

import { cartSubtotal, cartSalesTax, cartShipping, cartTotal } from "../utils/cart"
import { formatPrice } from "../utils/format"

const CheckoutComponent = () => {
  const stripe = useStripe()
  const elements = useElements()

  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  const { cart, clearCart } = useContext(CartContext)

  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  const [activePanel, setActivePanel] = useState(1)
  const [activePanelChanged, setActivePanelChanged] = useState(false)

  const [bfirstname, setBFirstname] = useState('')
  const [blastname, setBLastname] = useState('')
  const [baddress, setBAddress] = useState('')
  const [baddress2, setBAddress2] = useState('')
  const [bcity, setBCity] = useState('')
  const [bcountry, setBCountry] = useState('United States')
  const [bregion, setBRegion] = useState('')
  const [bzip, setBZip] = useState('')
  const [sameaddr, setSameaddr] = useState(false)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [address, setAddress] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('United States')
  const [region, setRegion] = useState('')
  const [zip, setZip] = useState('')
  const [email, setEmail] = useState('')
  const [newsletter, setNewsletter] = useState(false)

  const countryList = ["AU", "BS", "BE", "CA", "DK", "FI", "FR", "DE", "IE", "IT", "JP", "KR", "LU", "MX", "NL", "NZ", "NO", "PT", "PR", "ES", "SE", "CH", "GB", "US", "UM", "UT", "VG", "VI"]
  const priorityList = ["US", "CA"]

  // Create the PaymentIntent as soon as the component loads
  useEffect(() => {
    const createPaymentIntent = async () => {
      setProcessing(true)
      const response = await fetch(process.env.PAYMENT_INTENT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cart
        })
      })
      const data = await response.json()
      setClientSecret(data.client_secret)
      setProcessing(false)
    }
    createPaymentIntent()
  }, [cart])

  const handleTabChange = (selected) => {
    setActivePanel(selected)
    setActivePanelChanged(true)
  }

  const handleSameAddressClick = () => {
    setFirstname(sameaddr ? '' : bfirstname)
    setLastname(sameaddr ? '' : blastname)
    setAddress(sameaddr ? '' : baddress)
    setAddress2(sameaddr ? '' : baddress2)
    setCity(sameaddr ? '' : bcity)
    setRegion(sameaddr ? '' : bregion)
    setCountry(sameaddr ? 'United States' : bcountry)
    setZip(sameaddr ? '' : bzip)
    setSameaddr(!sameaddr)
    forceUpdate()
  }

  const handleNewsletterClick = () => {
    setNewsletter(!newsletter)
  }

  const handleCardChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  const handleSubmit = async event => {
    event.preventDefault()
    event.target.className += " was-validated"

    setProcessing(true)

/*    // Pre-payment vaildation (price correct & item still available)
    const preCheck = await fetch(process.env.VALIDATE_PAYMENT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: ""
    })

    if (preCheck) {

    }
*/
    // Submit Payment
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: email,
      payment_method: {
        card: elements.getElement(CardElement)
      }
    })

    if (paymentResult.error) {
      // Show error to buyer (e.g., insufficient funds)
      setError(`Payment failed ${paymentResult.error.message}`)
    } else {
      // The payment has been processed
      if (paymentResult.paymentIntent.status === 'succeeded') {
        setError(null)
        setSucceeded(true)

        // Post order and shipping address to strapi
        const order = {
          paymentIntent: paymentResult.paymentIntent,
          firstname,
          lastname,
          address,
          address2,
          city,
          state: region,
          zip,
          country,
          email,
          newsletter,
          cart
        }

        const orderResponse = await fetch(process.env.STRAPI_ORDER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(order)
        })

        //const orderResponse = await resp.json()
        //console.log("Order Create Response", resp)

        // TODO: Update qtyAvail in Strapi (Paintings & Tradingcards)

        clearCart()
      }
    }
    setProcessing(false)

    // Go to SuccessPage
    navigate('/success/', { state: { firstname } })
  }

  return (
    <MDBCard className='w-100'>
      <MDBCardBody>
        <MDBRow>
          <MDBCol lg='8' className='mb-4'>

            <MDBStepper form>
              <MDBStep form>
                <a href="#formstep1" onClick={() => handleTabChange(1)}>
                  <MDBBtn color={activePanel === 1 ? "indigo" : "default"} circle>
                    1
                  </MDBBtn>
                </a>
                <h4 className={activePanel === 1 ?
                  "mb-4 mt-0 font-weight-bold" :
                  "mb-4 mt-0 font-weight-bold text-muted"}>
                  Billing Address
                </h4>
              </MDBStep>
              <MDBStep form>
                <a href="#formstep2" onClick={() => handleTabChange(2)}>
                  <MDBBtn color={activePanel === 2 ? "indigo" : "default"} circle>
                    2
                  </MDBBtn>
                </a>
                <h4 className={activePanel === 2 ?
                  "mb-4 mt-0 font-weight-bold" :
                  "mb-4 mt-0 font-weight-bold text-muted"}>
                  Shipping Address
                </h4>
              </MDBStep>
              <MDBStep form>
                <a href="#formstep3" onClick={() => handleTabChange(3)}>
                  <MDBBtn color={activePanel === 3 ? "indigo" : "default"} circle>
                    3
                  </MDBBtn>
                </a>
                <h4 className={activePanel === 3 ?
                  "mb-4 mt-0 font-weight-bold" :
                  "mb-4 mt-0 font-weight-bold text-muted"}>
                  Email & Payment
                </h4>
              </MDBStep>
            </MDBStepper>

            <form className="needs-validation" onSubmit={(e) => handleSubmit(e)} noValidate>
              <MDBRow>
                {activePanel === 1 && (
                  <MDBCol md='12'>
                    <MDBRow>
                      <MDBCol md="6">
                        <MDBInput type="text" id="bfirst" name="bfirst" label="First Name" value={bfirstname} className="mt-4" required onChange={(e) => setBFirstname(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="blast" name="blast" label="Last Name"  value={blastname} className="mt-4" required onChange={(e) => setBLastname(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="baddress" name="baddress" label="Address" value={baddress} className="mt-0" required onChange={(e) => setBAddress(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="baddress2" name="baddress2" label="Address 2 (optional)" value={baddress2} onChange={(e) => setBAddress2(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="12">
                        <MDBInput type="text" id="bcity" name="bcity" label="City" required value={bcity} onChange={(e) => setBCity(e.target.value)} />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="country-region-zip">
                      <MDBCol lg='4' md='12' className='mb-4'>
                        <label htmlFor="bcountry" className="input-label mt-0">Country</label>
                        <CountryDropdown id="bcountry" whitelist={countryList} priorityOptions={priorityList} className="form-control" required value={bcountry} onChange={(val) => setBCountry(val)} />
                      </MDBCol>
                      <MDBCol lg='4' md='6' className='mb-4'>
                        <label htmlFor="bregion" className="input-label mt-0">State/Province</label>
                        <RegionDropdown id="bregion" className="form-control" required country={bcountry} value={bregion} onChange={(val) => setBRegion(val)}>
                          Country
                        </RegionDropdown>
                      </MDBCol>
                      <MDBCol lg='4' md='6' className='mt-2 mb-4'>
                        <MDBInput type="text" id="bzip" name="bzip" label="Zip/Postal Code" value={bzip} className='' required onChange={(e) => setBZip(e.target.value)} />
                      </MDBCol>
                    </MDBRow>

                    <MDBBtn color='indigo' rounded className='float-right'
                      onClick={() => handleTabChange(2)}>
                      Next
                    </MDBBtn>
                  </MDBCol>
                )}
                {activePanel === 2 && (
                  <MDBCol md='12'>
                    <MDBRow>
                      <MDBCol md="12" className="same-addr">
                        <MDBInput type="checkbox" id="sameaddr" name="sameaddr" label="Same as Billing Address" onChange={() => handleSameAddressClick()} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="bfirst" name="bfirst" label="First Name" value={firstname} className="mt-4" required onChange={(e) => setFirstname(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="blast" name="blast" label="Last Name"  value={lastname} className="mt-4" required onChange={(e) => setLastname(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="address" name="address" label="Address" value={address} className="mt-0" required onChange={(e) => setAddress(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="address2" name="address2" label="Address 2 (optional)" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="12">
                        <MDBInput type="text" id="city" name="city" label="City" required value={city} onChange={(e) => setCity(e.target.value)} />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="country-region-zip">
                      <MDBCol lg='4' md='12'>
                        <label htmlFor="country" className="input-label mt-0">Country</label>
                        <CountryDropdown id="country" whitelist={countryList} priorityOptions={priorityList} className="form-control" required value={country} onChange={(val) => setCountry(val)} />
                      </MDBCol>
                      <MDBCol lg='4' md='6'>
                        <label htmlFor="region" className="input-label mt-0">State/Province</label>
                        <RegionDropdown id="region" className="form-control" required country={country} value={region} onChange={(val) => setRegion(val)}>
                          Country
                        </RegionDropdown>
                      </MDBCol>
                      <MDBCol lg='4' md='6' className="mt-2">
                        <MDBInput type="text" id="zip" name="zip" label="Zip/Postal Code" value={zip} className='zip mt-2' required onChange={(e) => setZip(e.target.value)} />
                      </MDBCol>
                    </MDBRow>
                    <MDBBtn color='indigo' rounded className='float-left'
                      onClick={() => handleTabChange(1)}>
                      Previous
                    </MDBBtn>
                    <MDBBtn color='indigo' rounded className='float-right'
                      onClick={() => handleTabChange(3)}>
                      Next
                    </MDBBtn>
                  </MDBCol>
                )}
                {activePanel === 3 && (
                  <MDBCol md='12' className="payment-panel">
                    <MDBRow>
                      <MDBCol md="12">
                        <MDBInput type="email" id="email" name="email" label="Email" required className="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <small className='email-note text-muted'>
                          Your email is required for communication about this order
                        </small>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="12">
                        <MDBInput type="checkbox" id="newsletter" name="newsletter" label="Subscribe to Blake's mailing list" onChange={() => handleNewsletterClick()} />
                      </MDBCol>
                    </MDBRow>
                    <hr className='mb-4' />
                    <MDBRow>
                      <MDBCol md='12' className='mb-3'>
                        <CardSection />
                      </MDBCol>
                    </MDBRow>
                    <MDBBtn className='float-left' color='indigo' rounded onClick={() => handleTabChange(2)}>
                      Previous
                    </MDBBtn>
                    {(clientSecret && clientSecret.length > 0) &&
                      <MDBBtn type="submit" id="submit" className="float-right" color='success' rounded disabled={processing || disabled || succeeded}>
                        <span id="button-text">
                          {processing ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>)
                           : ("Place Order")}
                        </span>
                      </MDBBtn>
                    }
                    {/* Show any error that happens when processing the payment */}
                    {error && (
                      <div className="card-error float-right" role="alert">
                        {error}
                      </div>
                    )}
                  </MDBCol>
                )}
              </MDBRow>
            </form>
          </MDBCol>

          <MDBCol lg='4' className='mb-4'>
            <MDBCard>
              <MDBCardBody>
                <h4 className='mb-4 mt-1 h5 text-center font-weight-bold'>
                  Order Summary
                </h4>
                <hr />
                <div>
                  {(cart && cart.length > 0) &&
                      cart.map(item => {
                        return <div key={item.identifier}>
                          <MDBRow sm="12">
                            <MDBCol className="item">
                              <p key={item.identifier}>
                                {item.qty > 1 ? (item.qty + " - ") : null}
                                {item.title} - <span className='text-muted'>{item.subtitle}</span>
                                {item.qty > 1 ? <span className='text-muted'> (@ ${item.price} each)</span> : null}
                              </p>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow>
                            <MDBCol className="price mb-2">
                              {formatPrice(item.price * item.qty)}
                            </MDBCol>
                          </MDBRow>
                        </div>
                      }
                    )}
                    {(cart && cart.length > 0) &&
                      <div>
                        <hr />
                        <div className="summary-totals">
                          <p>Subtotal:</p>
                          <p>{formatPrice(cartSubtotal(cart))}</p>
                        </div>
                        <div className="summary-totals">
                          <p>Sales tax:</p>
                          <p>{formatPrice(cartSalesTax(cart))}</p>
                        </div>
                        <div className="summary-totals">
                          <p>Shipping:</p>
                          <p>{cartShipping(cart) ? formatPrice(cartShipping(cart)) : `Free`}</p>
                        </div>
                        <hr />
                        <div className="summary-totals">
                          <p>Total:</p>
                          <p><strong>{formatPrice(cartTotal(cart))}</strong></p>
                        </div>
                      </div>
                    }
                    {(cart && cart.length === 0) &&
                      <h3>Order processed</h3>
                    }
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
  )
}

export default CheckoutComponent;
