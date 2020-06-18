import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import HomeBtn from "../../components/home-btn"
import AbstractsGalleryGrid from "../../components/gallery-abstracts-grid"

const AbstractsGalleryPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Gallery - Abstracts" />
      <h1 className="page-head">Gallery - Abstracts</h1>

      <AbstractsGalleryGrid />

      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default AbstractsGalleryPage
