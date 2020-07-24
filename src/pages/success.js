import React from 'react';

import { MDBCard, MDBCardBody } from "mdbreact"

import Layout from "../components/layout"
import SEO from "../components/seo"
import HomeBtn from "../components/home-btn"

const SuccessPage = ({ location }) => {
  const firstname = (location && location.state && location.state.firstname) ? location.state.firstname : ''

  return (
    <Layout>
      <SEO title="OrderProcessed" />
        <div className="container page-container success">
          <h1 className="page-head">Order Processed</h1>
          <MDBCard>
            <MDBCardBody>
              <h2 className='mt-1 text-center'>
                {firstname.length > 0 &&
                  `Thanks, ${firstname}!`
                }
                {!firstname.length >0 &&
                  `Thanks!`
                }
              </h2>
              <p className="mb-4 lead">Order Confirmation email sent.</p>
              <HomeBtn />
            </MDBCardBody>
          </MDBCard>
        </div>
    </Layout>
  )
}

export default SuccessPage;
