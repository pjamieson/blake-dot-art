import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#212529",
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      fontWeight: "500",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardSection() {
  return (
    <>
      <label className="input-label mt-0">
        Credit card details
      </label>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </>
  );
};

export default CardSection;
