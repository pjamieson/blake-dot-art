import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HomeBtn from "../components/home-btn"
import PortraitsHockeyGrid from "../components/portraits-hockey-grid"

const ProHockeyPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Professional Athlete Portraits - Hockey" />
      <h1 className="page-head">Professional Athlete Portraits - Hockey</h1>

      <PortraitsHockeyGrid />

      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default ProHockeyPage
