import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HomeBtn from "../components/home-btn"
import AthletePortraitsGalleryGrid from "../components/gallery-athlete-portraits-grid"

const AthletePortraitsGalleryPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Gallery - Professional Athlete Portraits" />
      <h1 className="page-head">Gallery - Professional Athlete Portraits</h1>

      <AthletePortraitsGalleryGrid />

      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default AthletePortraitsGalleryPage
