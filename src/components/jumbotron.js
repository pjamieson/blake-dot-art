import React from "react"
import { Link } from "gatsby"
//import { Link, graphql, useStaticQuery } from "gatsby"
//import Img from "gatsby-image"

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
    heroImage: file(relativePath: { eq: "blake-mask-35.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    introImage: file(relativePath: { eq: "Blake-Jamieson-In-CA-Studio.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
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
