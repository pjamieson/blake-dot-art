import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HomeBtn from "../components/home-btn"
import OtherPortraitsGalleryGrid from "../components/gallery-other-portraits-grid"

const OtherPortraitsGalleryPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Gallery - Other Portraits" />
      <h1 className="page-head">Gallery - Other Portraits</h1>

      <OtherPortraitsGalleryGrid />

      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default OtherPortraitsGalleryPage
