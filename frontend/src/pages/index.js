import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import {
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdbreact"

import Layout from "../components/layout"
import Jumbotron from "../components/jumbotron"
import SEO from "../components/seo"
import HomeGrid from "../components/home-grid"

const getImage = graphql`
  {
    introImage: file(relativePath: { eq: "Blake-Jamieson-In-CA-Studio.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const IndexPage = () => {
  const data = useStaticQuery(getImage)
  return (
    <Layout>
      <SEO title="Home" />
      <MDBContainer>
        <Jumbotron />
        <MDBContainer className="front-content">
          <MDBRow className="intro-content">
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
              <Img fluid={data.introImage.childImageSharp.fluid} />
            </MDBCol>
          </MDBRow>
          <HomeGrid />
        </MDBContainer>
      </MDBContainer>
    </Layout>
  )
}

export default IndexPage
