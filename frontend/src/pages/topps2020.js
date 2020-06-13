import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HomeBtn from "../components/home-btn"
import Project2020Grid from "../components/project2020-grid"

const ToppsPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Topps Project 2020" />
      <h1 className="page-head">Topps Project 2020</h1>

      <Project2020Grid />

      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default ToppsPage
