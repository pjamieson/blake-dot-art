import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HomeBtn from "../components/home-btn"
import FelixGalleryGrid from "../components/gallery-felix-grid"

const FelixGalleryPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Gallery - Felix the Cat Series" />
      <h1 className="page-head">Gallery - Felix the Cat Series</h1>

      <FelixGalleryGrid />

      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default FelixGalleryPage
