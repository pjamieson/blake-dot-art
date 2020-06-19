import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import HomeBtn from "../../components/home-btn"

const MakeACommentPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="MakeACommentPage" />
      <h1 className="page-head">MakeACommentPage</h1>
      <p className="lead">Page Under Construction</p>
      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default MakeACommentPage
