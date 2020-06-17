import React from "react"
import Image from "gatsby-image"
import { Link, graphql, useStaticQuery } from "gatsby"

import {
  MDBBtn,
  MDBCol,
  MDBIcon,
  MDBJumbotron,
  MDBRow,
} from "mdbreact"

import logo from "../images/blake-logo-108x70.png"
/*
const getImages = graphql`
  {
    hero: file(relativePath: { eq: "blake-mask-35.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    logo: file(relativePath: { eq: "blake-logo-108x70.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }                     <Image fluid={data.logo.childImageSharp.fluid}
    }
  }                         const data = useStaticQuery(getImages)
`

*/
const Jumbotron = () => {
  return (
    <MDBJumbotron style={{ padding: 0 }}>
      <MDBCol className="bg-img text-center">
          <MDBRow className="site-intro blake-title">
            <h1>
              <div className="blake-title blake-title-start">BLAKE</div>
              <div className="blake-title blake-title-complete">
                <span><img src={logo} className="logo" alt="Logo"/>JAMIESON</span>
              </div>
            </h1>
            <h2>
              <div className="blake-title tag1">SUPPORT</div>
              <div className="blake-title tag2">LIVING</div>
              <div className="blake-title tag3">ARTISTS</div>
            </h2>
            <div className="featured-link">
              <Link to="/autograph-request/">
                <MDBBtn color="grey" outline>
                  Get Your Project 2020 Cards Autographed
                  <MDBIcon icon="caret-right" className="ml-2" />
                </MDBBtn>
              </Link>
            </div>
          </MDBRow>
      </MDBCol>
    </MDBJumbotron>
  )
}

export default Jumbotron
