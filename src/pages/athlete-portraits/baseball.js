import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import HomeBtn from "../../components/home-btn"
import PortraitsFootballGrid from "../../components/portraits-baseball-grid"

const ProBaseballPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Professional Athlete Portraits - Baseball" />
      <h1 className="page-head">Professional Athlete Portraits - Baseball</h1>

      <PortraitsFootballGrid />

      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default ProBaseballPage
