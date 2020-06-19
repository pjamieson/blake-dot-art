import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import HomeBtn from "../../components/home-btn"

const AskAQuestionPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Ask a Question" />
      <h1 className="page-head">Ask a Question</h1>
      <p className="lead">Page Under Construction</p>
      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default AskAQuestionPage
