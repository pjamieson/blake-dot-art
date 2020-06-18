import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import HomeBtn from "../../components/home-btn"
import PortraitsSoccerGrid from "../../components/portraits-soccer-grid"

const ProSoccerPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Professional Athlete Portraits - PortraitsSoccerGrid" />
      <h1 className="page-head">Professional Athlete Portraits - Soccer</h1>

      <PortraitsSoccerGrid />

      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default ProSoccerPage
