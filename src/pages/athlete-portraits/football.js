import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import HomeBtn from "../../components/home-btn"
import PortraitsFootballGrid from "../../components/portraits-football-grid"

const ProFootballPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Professional Athlete Portraits - Football" />
      <h1 className="page-head">Professional Athlete Portraits - Football</h1>

      <PortraitsFootballGrid />

      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default ProFootballPage
