import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <MDBContainer className="py-5 page-container">
      <h1>Page Not Found</h1>
      <p>The requested page does not exist on <strong>blake [dot] art</strong></p>
    </MDBContainer>
  </Layout>
)

export default NotFoundPage
