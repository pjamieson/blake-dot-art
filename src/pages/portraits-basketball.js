import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HomeBtn from "../components/home-btn"
import PortraitsBasketballGrid from "../components/portraits-basketball-grid"

const ProBasketballPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Professional Athlete Portraits - Basketball" />
      <h1 className="page-head">Professional Athlete Portraits - Basketball</h1>

      <PortraitsBasketballGrid />

      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default ProBasketballPage
