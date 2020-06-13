import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HomeBtn from "../components/home-btn"
import PortraitsOtherSportsGrid from "../components/portraits-other-sports-grid"

const ProOtherSportsPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Professional Athlete Portraits - Other Sports" />
      <h1 className="page-head">Professional Athlete Portraits - Other Sports</h1>

      <PortraitsOtherSportsGrid />

      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default ProOtherSportsPage
