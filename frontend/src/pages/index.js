import React from "react"

import {
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdbreact"

import Image from "../components/image"
import Layout from "../components/layout"
import Jumbotron from "../components/jumbotron"
import SEO from "../components/seo"
import GalleryGrid from "../components/gallery-grid"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <MDBContainer>
      <Jumbotron />
      <MDBContainer className="front-portfolio">
        <MDBRow>
          <MDBCol size="auto" md="9">
            <h2>Welcome!</h2>
            <h3>My name is Blake. I paint.</h3>
            <p className="lead grey-text">
              Scroll down to see a selection of pieces I painted over the past several years.
            </p>
            <p className="lead grey-text">
              Explore the menu links above to see more of my <strong>Pro Athlete Portraits</strong>, visit my online <strong>Gallery</strong> of available paintings or pick up some <strong>Merch</strong>andise I designed. You can also check out some of my <strong>Press</strong> coverage and learn about <strong>#TeamBlake</strong>.
            </p>
            <h3>Thanks for stopping by.</h3>
          </MDBCol>
          <MDBCol size="auto" md="3" className="d-none d-md-block">
            <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
              <Image />
            </div>
          </MDBCol>
        </MDBRow>
        <GalleryGrid />
      </MDBContainer>
    </MDBContainer>
  </Layout>
)

export default IndexPage
