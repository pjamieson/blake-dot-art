import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HomeBtn from "../components/home-btn"

const TeamPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Team" />
      <h1 className="page-head">#TeamBlake</h1>
      <p className="lead">Page Under Construction</p>
      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default TeamPage
